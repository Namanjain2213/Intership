"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Layout from "../../../../components/Layout"
import RichTextEditor from "../../../../components/RichTextEditor"
import { generateSlug } from "../../../../lib/utils"

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setTitle(data.post.title)
        setContent(data.post.content)
      } else {
        setError("Post not found")
      }
    } catch (error) {
      setError("Error loading post")
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/admin")
      } else {
        setError(data.error || "Failed to update post")
      }
    } catch (error) {
      setError("Error updating post")
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <Layout>
        <div className="loading">Loading post...</div>
      </Layout>
    )
  }

  if (error && !title) {
    return (
      <Layout>
        <div className="error">{error}</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Edit Post</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label>Slug Preview:</label>
          <input type="text" value={generateSlug(title)} readOnly style={{ backgroundColor: "#f5f5f5" }} />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Updating..." : "Update Post"}
          </button>
          <button type="button" className="btn" onClick={() => router.push("/admin")} style={{ background: "#6c757d" }}>
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  )
}

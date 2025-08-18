"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "../../../components/Layout.js"
import RichTextEditor from "../../../components/RichTextEditior.js"
import { generateSlug } from "../../../lib/utils.js"

export default function CreatePost() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
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
        setError(data.error || "Failed to create post")
      }
    } catch (error) {
      setError("Error creating post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Create New Post</h1>

      {error && <div className="error" style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

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

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
          <button type="button" className="btn" onClick={() => router.push("/admin")} style={{ background: "#6c757d" }}>
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  )
}

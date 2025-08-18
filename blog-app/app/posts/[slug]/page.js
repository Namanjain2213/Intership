"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Layout from "../../../components/Layout"
import { formatDate } from "../../../lib/utils"

export default function PostPage() {
  const params = useParams()
  const slug = params.slug
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setPost(data.post)
      } else {
        setError("Post not found")
      }
    } catch (error) {
      setError("Error loading post")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading post...</div>
      </Layout>
    )
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="error">{error || "Post not found"}</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <article>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">Published on {formatDate(post.createdAt)}</div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  )
}

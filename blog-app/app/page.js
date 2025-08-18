"use client"

import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import PostCard from "../components/PostCard"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading posts...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </Layout>
  )
}

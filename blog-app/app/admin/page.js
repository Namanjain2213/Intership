"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "../../components/Layout"
import PostCard from "../../components/PostCard"

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchPosts()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      setIsAuthenticated(true)
      fetchPosts()
    } else {
      alert("Invalid password")
    }
  }

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

  const handleDeletePost = (slug) => {
    setPosts(posts.filter((post) => post.slug !== slug))
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </Layout>
    )
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Admin Dashboard</h1>
        <Link href="/admin/create" className="btn">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>
          No posts available. <Link href="/admin/create">Create your first post</Link>
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} showAdminActions={true} onDelete={handleDeletePost} />
          ))}
        </div>
      )}
    </Layout>
  )
}

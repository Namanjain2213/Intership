"use client"

import Link from "next/link"
import { formatDate, truncateText } from "../lib/utils"

export default function PostCard({ post, showAdminActions = false, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/delete/${post.slug}`, {
          method: "DELETE",
        })

        if (response.ok) {
          onDelete(post.slug)
        } else {
          alert("Failed to delete post")
        }
      } catch (error) {
        alert("Error deleting post")
      }
    }
  }

  return (
    <div className="post-card">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="post-title">{post.title}</h2>
      </Link>
      <div className="post-meta">Published on {formatDate(post.createdAt)}</div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: truncateText(post.content.replace(/<[^>]*>/g, ""), 200),
        }}
      />

      {showAdminActions && (
        <div className="admin-actions">
          <Link href={`/admin/edit/${post.slug}`} className="btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

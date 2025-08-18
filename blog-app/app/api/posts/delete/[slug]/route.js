import dbConnect from "../../../../../lib/mongodb"
import Post from "../../../../../models/post"

export async function DELETE(request, { params }) {
  await dbConnect()

  try {
    const post = await Post.findOneAndDelete({ slug: params.slug })

    if (!post) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    return Response.json({ success: true, message: "Post deleted successfully" })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

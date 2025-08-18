import dbConnect from "../../../../lib/mongodb"
import Post from "../../../../models/post"
import { generateSlug } from "../../../../lib/utils"

export async function GET() {
  await dbConnect()

  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }) // Sort by latest first
    return Response.json({ success: true, posts })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  await dbConnect()

  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return Response.json({ success: false, error: "Title and content are required" }, { status: 400 })
    }

    const post = await Post.findOne({ slug: params.slug })

    if (!post) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    // Generate new slug if title changed
    let newSlug = params.slug
    if (post.title !== title) {
      newSlug = generateSlug(title)

      // Check if new slug already exists
      let existingPost = await Post.findOne({ slug: newSlug })
      let counter = 1
      while (existingPost && existingPost._id.toString() !== post._id.toString()) {
        newSlug = `${generateSlug(title)}-${counter}`
        existingPost = await Post.findOne({ slug: newSlug })
        counter++
      }
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug: params.slug },
      {
        title,
        content,
        slug: newSlug,
        updatedAt: new Date(),
      },
      { new: true },
    )

    return Response.json({ success: true, post: updatedPost })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

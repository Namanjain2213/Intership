import dbConnect from "../../../../lib/mongodb"
import Post from "../../../../models/post"
import { generateSlug } from "../../../../lib/utils"

export async function POST(request) {
  await dbConnect()

  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return Response.json({ success: false, error: "Title and content are required" }, { status: 400 })
    }

    let slug = generateSlug(title)

    // Check if slug already exists and make it unique
    let existingPost = await Post.findOne({ slug })
    let counter = 1
    while (existingPost) {
      slug = `${generateSlug(title)}-${counter}`
      existingPost = await Post.findOne({ slug })
      counter++
    }

    const post = await Post.create({
      title,
      content,
      slug,
    })

    return Response.json({ success: true, post }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

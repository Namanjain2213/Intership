import slugify from "slugify"

export function generateSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

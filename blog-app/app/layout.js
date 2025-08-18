import "./globals.css"

export const metadata = {
  title: "Blog Website",
  description: "A modern blog website built with Next.js",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

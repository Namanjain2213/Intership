import "./globals.css"

export const metadata = {
  title: "Naman Jain - Personal Dashboard",
  description: "Personal dashboard showcasing academic and professional information",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}

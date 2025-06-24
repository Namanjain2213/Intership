import { Inter } from "next/font/google"
import "./globals.css" // ← This import is crucial
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Artistly - Performing Artist Booking Platform",
  description: "Connect event planners with talented performing artists.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}

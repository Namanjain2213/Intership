"use client"

import { useState, useEffect } from "react"
import { Heart, Moon, Sun, Search } from "lucide-react"

const Header = ({ darkMode, toggleDarkMode, wishlistCount, toggleWishlistPanel, handleSearch, searchQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(localSearchQuery)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""} ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">CarFinder</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-auto md:mx-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars by name or brand..."
                className={`w-full py-2 pl-10 pr-4 rounded-full border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleWishlistPanel}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Wishlist"
            >
              <Heart
                className={`h-6 w-6 ${wishlistCount > 0 ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-6 w-6 text-yellow-300" /> : <Moon className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

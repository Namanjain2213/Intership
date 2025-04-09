"use client"

import { Heart } from "lucide-react"

const WishlistButton = ({ isInWishlist, onClick, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 py-2 px-4 rounded-md transition-colors ${
        isInWishlist
          ? "bg-red-500 text-white"
          : darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      }`}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-white" : ""}`} />
      {isInWishlist ? "Saved" : "Save"}
    </button>
  )
}

export default WishlistButton

"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

const CarCard = ({ car, onSelect, isInWishlist, toggleWishlist, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 transform ${
        isHovered ? "scale-[1.02] shadow-lg" : ""
      } ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={car.image || `/placeholder.svg?height=200&width=400`}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(car)
          }}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-white"
          } transition-colors`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? "fill-white" : ""}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white font-bold text-xl">{formatPrice(car.price)}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{car.name}</h3>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{car.brand}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <span className="font-medium">Fuel:</span> {car.fuelType}
          </div>
          <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <span className="font-medium">Seats:</span> {car.seatingCapacity}
          </div>
          <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <span className="font-medium">Year:</span> {car.year}
          </div>
          <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <span className="font-medium">Mileage:</span> {car.mileage}
          </div>
        </div>

        <button
          onClick={() => onSelect(car)}
          className={`w-full mt-4 py-2 rounded-md transition-colors ${
            darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-medium`}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default CarCard

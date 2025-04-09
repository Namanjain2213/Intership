"use client"

import { X, Heart } from "lucide-react"

const WishlistPanel = ({ wishlist, onClose, onSelect, toggleWishlist, darkMode }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="bg-black/50 backdrop-blur-sm absolute inset-0" onClick={onClose}></div>
      <div
        className={`relative w-full max-w-md h-full overflow-y-auto shadow-xl transition-all transform animate-slide-in ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            Wishlist
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
            <Heart className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Save your favorite cars to compare them later
            </p>
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              {wishlist.map((car) => (
                <div
                  key={car.id}
                  className={`rounded-lg overflow-hidden shadow-sm border transition-colors ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={car.image || `/placeholder.svg?height=100&width=100`}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm">{car.name}</h3>
                          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{car.brand}</p>
                          <p className="font-bold text-sm mt-1">{formatPrice(car.price)}</p>
                        </div>
                        <button
                          onClick={() => toggleWishlist(car)}
                          className="p-1 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Heart className="h-4 w-4 fill-red-500" />
                        </button>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex gap-2 text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                            {car.fuelType}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                            {car.seatingCapacity} Seats
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            onSelect(car)
                            onClose()
                          }}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                wishlist.forEach((car) => toggleWishlist(car))
              }}
              className={`w-full mt-6 py-2 rounded-md transition-colors ${
                darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
              } text-white font-medium`}
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPanel

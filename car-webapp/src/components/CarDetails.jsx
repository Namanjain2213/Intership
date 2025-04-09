"use client"

import { X, Heart, Share2 } from "lucide-react"

const CarDetails = ({ car, onClose, isInWishlist, toggleWishlist, darkMode }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
          aria-label="Close details"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="relative h-64 md:h-80">
          <img
            src={car.image || `/placeholder.svg?height=400&width=800`}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-white font-bold text-3xl">{car.name}</h2>
            <p className="text-white/80 text-lg">
              {car.brand} · {car.year}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <span className="text-3xl font-bold">{formatPrice(car.price)}</span>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => toggleWishlist(car)}
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

              <button
                className={`flex items-center gap-1 py-2 px-4 rounded-md transition-colors ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Fuel Type:</span>
                </div>
                <div className="text-sm font-medium">{car.fuelType}</div>

                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Seating Capacity:</span>
                </div>
                <div className="text-sm font-medium">{car.seatingCapacity} Seats</div>

                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Mileage:</span>
                </div>
                <div className="text-sm font-medium">{car.mileage}</div>

                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Transmission:</span>
                </div>
                <div className="text-sm font-medium">{car.transmission || "Automatic"}</div>

                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Engine:</span>
                </div>
                <div className="text-sm font-medium">{car.engine || "2.0L"}</div>

                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <span className="font-medium">Color:</span>
                </div>
                <div className="text-sm font-medium">{car.color || "White"}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {(
                  car.features || [
                    "Air Conditioning",
                    "Power Steering",
                    "Power Windows",
                    "Anti-Lock Braking System",
                    "Driver Airbag",
                    "Passenger Airbag",
                    "Automatic Climate Control",
                    "Alloy Wheels",
                  ]
                ).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-500"}`}
                    ></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {car.description ||
                `The ${car.year} ${car.brand} ${car.name} is a ${car.seatingCapacity}-seater vehicle with a ${car.fuelType} engine. It offers a perfect blend of performance, comfort, and style. With its advanced features and reliable performance, this car is designed to provide an exceptional driving experience.`}
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className={`py-2 px-6 rounded-md transition-colors ${
                darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails

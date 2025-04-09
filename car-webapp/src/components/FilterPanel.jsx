"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Filter, ArrowUpDown } from "lucide-react"

const FilterPanel = ({ filters, handleFilterChange, handleSortChange, sortOrder, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [brands, setBrands] = useState([
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
    "Tesla",
    "Hyundai",
    "Kia",
    "Nissan",
  ])
  const [fuelTypes, setFuelTypes] = useState(["Petrol", "Diesel", "Electric", "Hybrid"])
  const [seatingCapacities, setSeatingCapacities] = useState([2, 4, 5, 6, 7, 8])

  // Close filter panel on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  const clearFilters = () => {
    handleFilterChange("brand", "")
    handleFilterChange("minPrice", "")
    handleFilterChange("maxPrice", "")
    handleFilterChange("fuelType", "")
    handleFilterChange("seatingCapacity", "")
    handleSortChange("")
  }

  return (
    <div
      className={`w-full md:w-64 md:min-w-64 rounded-lg overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border shadow-sm`}
    >
      <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h2>
        <button className="md:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={togglePanel}>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className={`w-1/2 p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className={`w-1/2 p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
              />
            </div>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Seating Capacity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Seating Capacity</label>
            <select
              value={filters.seatingCapacity}
              onChange={(e) => handleFilterChange("seatingCapacity", e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            >
              <option value="">Any Capacity</option>
              {seatingCapacities.map((capacity) => (
                <option key={capacity} value={capacity}>
                  {capacity} Seats
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium mb-2">Sort By Price</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSortChange(sortOrder === "lowToHigh" ? "" : "lowToHigh")}
                className={`flex-1 py-2 px-3 rounded flex items-center justify-center gap-1 transition-colors ${
                  sortOrder === "lowToHigh"
                    ? "bg-blue-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                Low to High
              </button>
              <button
                onClick={() => handleSortChange(sortOrder === "highToLow" ? "" : "highToLow")}
                className={`flex-1 py-2 px-3 rounded flex items-center justify-center gap-1 transition-colors ${
                  sortOrder === "highToLow"
                    ? "bg-blue-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                High to Low
              </button>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className={`w-full py-2 rounded transition-colors ${
              darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import FilterPanel from "./components/FilterPanel"
import CarCard from "./components/CarCard"
import Pagination from "./components/Pagination"
import CarDetails from "./components/CarDetails"
import WishlistPanel from "./components/WishlistPanel"
import { fetchCars } from "./services/carServices"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  // State for cars data
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for filters
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    fuelType: "",
    seatingCapacity: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [carsPerPage] = useState(10)

  // State for selected car details
  const [selectedCar, setSelectedCar] = useState(null)

  // State for wishlist
  const [wishlist, setWishlist] = useLocalStorage("carWishlist", [])

  // State for wishlist panel visibility
  const [showWishlist, setShowWishlist] = useState(false)

  // State for dark mode
  const [darkMode, setDarkMode] = useState(false)

  // State for sort order
  const [sortOrder, setSortOrder] = useState("")

  // Fetch cars data
  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true)
        const data = await fetchCars()
        setCars(data)
        setFilteredCars(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch cars. Please try again later.")
        setLoading(false)
      }
    }

    getCars()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...cars]

    // Apply search query
    if (searchQuery) {
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand)
    }

    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter((car) => car.price >= Number.parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((car) => car.price <= Number.parseInt(filters.maxPrice))
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter((car) => car.fuelType === filters.fuelType)
    }

    // Apply seating capacity filter
    if (filters.seatingCapacity) {
      result = result.filter((car) => car.seatingCapacity === Number.parseInt(filters.seatingCapacity))
    }

    // Apply sorting
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredCars(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [cars, filters, searchQuery, sortOrder])

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Handle car selection for details
  const handleCarSelect = (car) => {
    setSelectedCar(car)
  }

  // Handle closing car details
  const handleCloseDetails = () => {
    setSelectedCar(null)
  }

  // Handle adding/removing from wishlist
  const toggleWishlist = (car) => {
    if (wishlist.some((item) => item.id === car.id)) {
      setWishlist(wishlist.filter((item) => item.id !== car.id))
    } else {
      setWishlist([...wishlist, car])
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Toggle wishlist panel
  const toggleWishlistPanel = () => {
    setShowWishlist(!showWishlist)
  }

  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        wishlistCount={wishlist.length}
        toggleWishlistPanel={toggleWishlistPanel}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <FilterPanel
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
            sortOrder={sortOrder}
            darkMode={darkMode}
          />

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-200">
                {error}
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold">No cars found matching your criteria</h3>
                <p className="mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      onSelect={handleCarSelect}
                      isInWishlist={wishlist.some((item) => item.id === car.id)}
                      toggleWishlist={toggleWishlist}
                      darkMode={darkMode}
                    />
                  ))}
                </div>

                <Pagination
                  carsPerPage={carsPerPage}
                  totalCars={filteredCars.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  darkMode={darkMode}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {selectedCar && (
        <CarDetails
          car={selectedCar}
          onClose={handleCloseDetails}
          isInWishlist={wishlist.some((item) => item.id === selectedCar.id)}
          toggleWishlist={toggleWishlist}
          darkMode={darkMode}
        />
      )}

      {showWishlist && (
        <WishlistPanel
          wishlist={wishlist}
          onClose={toggleWishlistPanel}
          onSelect={handleCarSelect}
          toggleWishlist={toggleWishlist}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}

export default App

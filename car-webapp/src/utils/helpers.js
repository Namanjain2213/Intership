// Format price to currency
export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }
  
  // Get unique values from array of objects
  export const getUniqueValues = (data, type) => {
    return [...new Set(data.map((item) => item[type]))]
  }
  
  // Debounce function for search input
  export const debounce = (func, delay) => {
    let timeoutId
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
  
  // Filter cars by search query
  export const filterCarsBySearch = (cars, query) => {
    if (!query) return cars
  
    const lowercaseQuery = query.toLowerCase()
    return cars.filter(
      (car) => car.name.toLowerCase().includes(lowercaseQuery) || car.brand.toLowerCase().includes(lowercaseQuery),
    )
  }
  
  // Filter cars by criteria
  export const filterCarsByCriteria = (cars, filters) => {
    return cars.filter((car) => {
      // Filter by brand
      if (filters.brand && car.brand !== filters.brand) {
        return false
      }
  
      // Filter by price range
      if (filters.minPrice && car.price < Number.parseInt(filters.minPrice)) {
        return false
      }
  
      if (filters.maxPrice && car.price > Number.parseInt(filters.maxPrice)) {
        return false
      }
  
      // Filter by fuel type
      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false
      }
  
      // Filter by seating capacity
      if (filters.seatingCapacity && car.seatingCapacity !== Number.parseInt(filters.seatingCapacity)) {
        return false
      }
  
      return true
    })
  }
  
  // Sort cars by price
  export const sortCarsByPrice = (cars, order) => {
    if (!order) return cars
  
    return [...cars].sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price
      } else if (order === "highToLow") {
        return b.price - a.price
      }
      return 0
    })
  }
  
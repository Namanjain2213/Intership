"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ carsPerPage, totalCars, paginate, currentPage, darkMode }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i)
  }

  if (pageNumbers.length <= 1) return null

  const goToPrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1)
    }
  }

  // Determine which page numbers to show
  let displayedPageNumbers = []
  const maxPagesToShow = 5

  if (pageNumbers.length <= maxPagesToShow) {
    displayedPageNumbers = pageNumbers
  } else {
    // Always include first and last page
    const firstPage = 1
    const lastPage = pageNumbers.length

    // Calculate the range of pages to show around the current page
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1)
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > lastPage) {
      endPage = lastPage
      startPage = Math.max(endPage - maxPagesToShow + 1, 1)
    }

    // Add pages to the array
    for (let i = startPage; i <= endPage; i++) {
      displayedPageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (startPage > 1) {
      displayedPageNumbers = [1, "...", ...displayedPageNumbers.slice(2)]
    }

    if (endPage < lastPage) {
      displayedPageNumbers = [...displayedPageNumbers.slice(0, -2), "...", lastPage]
    }
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md transition-colors ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </li>

        {displayedPageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className={`px-3 py-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>...</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                  currentPage === number
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={goToNextPage}
            disabled={currentPage === pageNumbers.length}
            className={`p-2 rounded-md transition-colors ${
              currentPage === pageNumbers.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

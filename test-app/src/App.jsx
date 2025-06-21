"use client"

import { useState } from "react"
import "./App.css"
import ViewItems from "./components/ViewItems"
import AddItems from "./components/AddItems"

function App() {
  const [currentPage, setCurrentPage] = useState("view")
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic White Shirt",
      type: "Shirt",
      description: "A comfortable white cotton shirt perfect for office wear. Made from 100% cotton with a modern fit.",
      coverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      type: "Pant",
      description: "Stylish blue denim jeans with a comfortable fit. Perfect for casual and semi-formal occasions.",
      coverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-d405872a4d86?w=400&h=400&fit=crop",
      ],
    },
    {
      id: 3,
      name: "Running Shoes",
      type: "Shoes",
      description: "Lightweight running shoes for daily exercise. Breathable material with excellent cushioning.",
      coverImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
      ],
    },
  ])

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now(),
    }
    setItems((prev) => [...prev, item])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Items Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentPage === "view"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage("view")}
              >
                View Items
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentPage === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage("add")}
              >
                Add Items
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentPage === "view" ? (
          <ViewItems items={items} />
        ) : (
          <AddItems onAddItem={addItem} onSuccess={() => setCurrentPage("view")} />
        )}
      </main>
    </div>
  )
}

export default App

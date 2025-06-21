"use client"

import { useState } from "react"
import ItemModal from "./ItemModal"

const ViewItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">View Items</h2>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found. Add some items to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.coverImage || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}

export default ViewItems

"use client"

import { useState } from "react"

const AddItems = ({ onAddItem, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [],
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [coverImagePreview, setCoverImagePreview] = useState("")
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([])

  const itemTypes = ["Shirt", "Pant", "Shoes", "Sports Gear", "Accessories", "Other"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setCoverImagePreview(imageUrl)
        handleInputChange("coverImage", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = []
    const newImages = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        newPreviews.push(imageUrl)
        newImages.push(imageUrl)

        if (newPreviews.length === files.length) {
          setAdditionalImagePreviews((prev) => [...prev, ...newPreviews])
          handleInputChange("additionalImages", [...formData.additionalImages, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index) => {
    const newPreviews = additionalImagePreviews.filter((_, i) => i !== index)
    const newImages = formData.additionalImages.filter((_, i) => i !== index)
    setAdditionalImagePreviews(newPreviews)
    handleInputChange("additionalImages", newImages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
      alert("Please fill in all required fields")
      return
    }

    onAddItem(formData)

    // Reset form
    setFormData({
      name: "",
      type: "",
      description: "",
      coverImage: "",
      additionalImages: [],
    })
    setCoverImagePreview("")
    setAdditionalImagePreviews([])

    // Show success message
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onSuccess()
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="max-w-md p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-800 font-medium">Item successfully added!</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Item Details</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter item name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Item Type */}
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Item Type *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select item type</option>
                {itemTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Item Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Item Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter item description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Item Cover Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
                <label htmlFor="coverImage" className="cursor-pointer">
                  {coverImagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={coverImagePreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg
                        className="w-8 h-8 text-gray-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-gray-600">Click to upload cover image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700">
                Additional Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="additionalImages"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                />
                <label htmlFor="additionalImages" className="cursor-pointer">
                  <div className="space-y-2">
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-gray-600">Click to upload additional images</p>
                  </div>
                </label>
              </div>

              {additionalImagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItems

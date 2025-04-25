"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { Calendar, Upload, X } from "lucide-react"
import Image from "next/image"

export default function AddProductPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [isFarmer, setIsFarmer] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (user.role !== "farmer") {
      router.push("/")
      return
    }

    setIsFarmer(true)
  }, [user, router])

  if (!isFarmer) {
    return null
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "kg",
    quantity: "",
    expiryDate: "",
    delivery: true,
    pickup: true,
  })

  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: target.checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For demo purposes, we'll just add a placeholder
    setImages((prev) => [...prev, "/placeholder.svg?height=200&width=200"])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to products page
    router.push("/dashboard/products")
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Product Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Organic Tomatoes"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="input-field"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="input-field"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Specialty">Specialty</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Best Before Date*
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      className="input-field pl-10"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price* ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    className="input-field"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                    Unit*
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    required
                    className="input-field"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="bunch">Bunch</option>
                    <option value="item">Item</option>
                    <option value="dozen">Dozen</option>
                    <option value="jar">Jar</option>
                    <option value="loaf">Loaf</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Quantity*
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min="1"
                    className="input-field"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Options*</h3>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="delivery"
                        checked={formData.delivery}
                        onChange={handleChange}
                        className="mr-2 accent-lime-500"
                      />
                      Delivery Available
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pickup"
                        checked={formData.pickup}
                        onChange={handleChange}
                        className="mr-2 accent-lime-500"
                      />
                      Pickup Available
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-lime-500 hover:border-lime-500 transition-colors"
                  >
                    <Upload size={24} />
                    <span className="mt-2 text-sm">Add Image</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Upload up to 5 images. First image will be used as the product thumbnail.
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="btn-secondary" disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

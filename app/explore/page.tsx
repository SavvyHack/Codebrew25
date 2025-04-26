"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useCart } from "@/app/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Filter, Search, ShoppingCart, MapPin, Truck } from "lucide-react"

// Define an interface for the Product structure based on API response
interface Product {
  id: number;
  name: string;
  description: string;
  price: number; 
  unit: string;
  image_link: string; 
  farmer_id: number; 
  location: string;
  category: string;
  delivery: boolean;
  pickup: boolean;
  expiry_date: string; 
  stock: number; 
}

// Categories (Can eventually be fetched or remain static)
const categories = ["All", "Vegetables", "Fruits", "Dairy", "Meat", "Bakery", "Specialty"] 

// Locations (Can eventually be fetched or remain static)
const locations = [
  "All",
  "Brisbane, QLD",
  "Sydney, NSW",
  "Melbourne, VIC",
  "Adelaide, SA",
  "Perth, WA",
  "Hobart, TAS",
  "Canberra, ACT",
] 

export default function ExplorePage() {
  const { addToCart } = useCart() 

  const [products, setProducts] = useState<Product[]>([]) 
  const [isLoading, setIsLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null) 

  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    delivery: false,
    pickup: false,
    search: "",
    minPrice: "",
    maxPrice: "",
  })

  const [showFilters, setShowFilters] = useState(false)

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get<Product[]>('/api/products')
        setProducts(response.data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, []) 

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddToCart = (product: Product) => {
    // Create an object matching the CartItem structure expected by addToCart
    // Assuming CartItem expects 'image' and 'farmer' (as string, adjust if needed)
    const cartItemData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_link,        // Map image_link -> image
      farmer: `Farmer ${product.farmer_id}`, // Map farmer_id -> farmer (using a placeholder string)
                                          // TODO: Fetch actual farmer name if needed later
      unit: product.unit,
      // Add any other fields expected by CartItem (Omit<CartItem, "quantity">)
    };
    addToCart(cartItemData, 1); // Pass the correctly structured object
    console.log(`${product.name} added to cart`);
  };

  const resetFilters = () => {
    setFilters({
      category: "All",
      location: "All",
      delivery: false,
      pickup: false,
      search: "",
      minPrice: "",
      maxPrice: "",
    })
  }

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (filters.category !== "All" && product.category !== filters.category) {
      return false
    }

    // Location filter
    if (filters.location !== "All" && product.location !== filters.location) {
      return false
    }

    // Delivery option filter
    if (filters.delivery && !product.delivery) {
      return false
    }

    // Pickup option filter
    if (filters.pickup && !product.pickup) {
      return false
    }

    // Price range filter
    if (filters.minPrice && product.price < Number.parseFloat(filters.minPrice)) {
      return false
    }

    if (filters.maxPrice && product.price > Number.parseFloat(filters.maxPrice)) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.location.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-full md:w-64 bg-white rounded-lg shadow-md p-4 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={resetFilters} className="text-sm text-lime-500 hover:text-lime-600">
                Reset All
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange("category", category)}
                        className="mr-2 accent-lime-500"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="input-field"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="input-field w-1/2"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="input-field w-1/2"
                    min="0"
                  />
                </div>
              </div>

              {/* Delivery Options Filter */}
              <div>
                <h3 className="font-semibold mb-2">Delivery Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.delivery}
                      onChange={(e) => handleFilterChange("delivery", e.target.checked)}
                      className="mr-2 accent-lime-500"
                    />
                    <Truck size={16} className="mr-1" /> Delivery Available
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.pickup}
                      onChange={(e) => handleFilterChange("pickup", e.target.checked)}
                      className="mr-2 accent-lime-500"
                    />
                    <MapPin size={16} className="mr-1" /> Pickup Available
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, farmers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden btn-secondary flex items-center justify-center gap-2"
              >
                <Filter size={20} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Loading"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Loading products...</h3>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Error"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{error}</h3>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card group">
                    <Link href={`explore/product/${product.id}`}>
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                        <Image
                          src={product.image_link || "/placeholder.svg"} 
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-semibold">
                          {product.category}
                        </div>
                        {(product.delivery || product.pickup) && (
                          <div className="absolute top-2 right-2 flex space-x-1">
                            {product.delivery && (
                              <Truck
                                size={16}
                                className="text-white bg-green-600 p-0.5 rounded-full"
                              />
                            )}
                            {product.pickup && (
                              <MapPin
                                size={16}
                                className="text-white bg-blue-600 p-0.5 rounded-full"
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold group-hover:text-green-700 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                        {/* Farmer name would require fetching/joining data, showing location for now */}
                        <p className="text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="inline mr-1" />
                          {product.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expires: {new Date(product.expiry_date).toLocaleDateString()} 
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xl font-bold text-green-800">
                            ${product.price.toFixed(2)}
                          </p>
                          <span className="text-sm text-gray-500">/ {product.unit}</span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="No results"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <button onClick={resetFilters} className="btn-primary">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

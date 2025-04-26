"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Search, ShoppingCart, MapPin, Truck } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

// Sample products data
const productsData = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes",
    price: 5.99,
    unit: "kg",
    image: "/product-pic-list/organicTomatoes.png?height=200&width=200",
    farmer: "Green Valley Farm",
    location: "Brisbane, QLD",
    category: "Vegetables",
    delivery: true,
    pickup: true,
    expiry: "2023-12-15",
  },
  {
    id: 2,
    name: "Free Range Eggs",
    description: "Farm fresh free-range eggs from happy hens",
    price: 7.5,
    unit: "dozen",
    image: "/product-pic-list/freeRangeEggs.png?height=200&width=200",
    farmer: "Happy Hens Farm",
    location: "Sydney, NSW",
    category: "Dairy",
    delivery: true,
    pickup: false,
    expiry: "2023-12-10",
  },
  {
    id: 3,
    name: "Raw Honey",
    description: "Pure, unfiltered honey from local beehives",
    price: 12.99,
    unit: "jar",
    image: "/product-pic-list/rawHoney.png?height=200&width=200",
    farmer: "Buzzy Bee Apiary",
    location: "Melbourne, VIC",
    category: "Specialty",
    delivery: true,
    pickup: true,
    expiry: "2024-06-20",
  },
  {
    id: 4,
    name: "Artisan Sourdough Bread",
    description: "Handcrafted sourdough bread made with organic flour",
    price: 6.5,
    unit: "loaf",
    image: "/product-pic-list/artisanSourdoughBread.png?height=200&width=200",
    farmer: "Countryside Bakery",
    location: "Adelaide, SA",
    category: "Bakery",
    delivery: false,
    pickup: true,
    expiry: "2023-12-05",
  },
  {
    id: 5,
    name: "Grass-Fed Beef",
    description: "Premium grass-fed beef from free-range cattle",
    price: 22.99,
    unit: "kg",
    image: "/product-pic-list/grassFedBeef.png?height=200&width=200",
    farmer: "Green Pastures Farm",
    location: "Perth, WA",
    category: "Meat",
    delivery: true,
    pickup: true,
    expiry: "2023-12-20",
  },
  {
    id: 6,
    name: "Organic Apples",
    description: "Sweet and crisp organic apples",
    price: 4.99,
    unit: "kg",
    image: "/product-pic-list/organicApples.png?height=200&width=200",
    farmer: "Orchard Haven",
    location: "Hobart, TAS",
    category: "Fruits",
    delivery: true,
    pickup: true,
    expiry: "2023-12-18",
  },
  {
    id: 7,
    name: "Fresh Goat Cheese",
    description: "Creamy, tangy goat cheese made from pasture-raised goats",
    price: 8.99,
    unit: "200g",
    image: "/product-pic-list/freshGoatCheese.png?height=200&width=200",
    farmer: "Mountain Goat Dairy",
    location: "Canberra, ACT",
    category: "Dairy",
    delivery: true,
    pickup: false,
    expiry: "2023-12-12",
  },
  {
    id: 8,
    name: "Organic Carrots",
    description: "Sweet, crunchy organic carrots",
    price: 3.99,
    unit: "bunch",
    image: "/product-pic-list/organicCarrots.png?height=200&width=200",
    farmer: "Green Valley Farm",
    location: "Brisbane, QLD",
    category: "Vegetables",
    delivery: true,
    pickup: true,
    expiry: "2023-12-15",
  },
]

// Categories
const categories = ["All", "Vegetables", "Fruits", "Dairy", "Meat", "Bakery", "Specialty"]

// Locations
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

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

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

  const filteredProducts = productsData.filter((product) => {
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
        product.farmer.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const handleAddToCart = (product: any) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        farmer: product.farmer,
        unit: product.unit,
      },
      1,
    )
  }

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
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <button
                        className="absolute bottom-4 right-4 bg-lime-500 hover:bg-lime-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleAddToCart(product)}
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                    <div className="p-4">
                      <Link href={`/explore/product/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-lime-500 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm mb-2">by {product.farmer}</p>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg">
                          ${product.price.toFixed(2)}
                          <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          {product.delivery && <Truck size={16} className="text-lime-500" aria-label="Delivery Available" />}
                          {product.pickup && <MapPin size={16} className="text-lime-500" aria-label="Pickup Available" />}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        <MapPin size={12} className="inline mr-1" /> {product.location}
                      </p>
                    </div>
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

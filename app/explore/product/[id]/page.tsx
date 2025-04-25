"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Star, Truck, MapPin, Calendar, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

// Sample products data (same as in explore page)
const productsData = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description:
      "Fresh, locally grown organic tomatoes that are perfect for salads, sandwiches, or cooking. These tomatoes are grown without synthetic pesticides or fertilizers, ensuring you get the purest flavor and highest nutritional value. Our farming practices focus on sustainability and environmental stewardship.",
    price: 5.99,
    unit: "kg",
    image: "/placeholder.svg?height=400&width=400",
    farmer: "Green Valley Farm",
    farmerImage: "/placeholder.svg?height=100&width=100",
    location: "Brisbane, QLD",
    category: "Vegetables",
    delivery: true,
    pickup: true,
    expiry: "2023-12-15",
    rating: 4.5,
    reviews: 28,
    availableQuantity: 50,
    additionalImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 2,
    name: "Free Range Eggs",
    description:
      "Farm fresh free-range eggs from happy hens that roam freely on our pastures. Our hens are fed a natural diet and are never given antibiotics or hormones. These eggs have vibrant, orange yolks and exceptional flavor that you can only get from truly free-range chickens.",
    price: 7.5,
    unit: "dozen",
    image: "/placeholder.svg?height=400&width=400",
    farmer: "Happy Hens Farm",
    farmerImage: "/placeholder.svg?height=100&width=100",
    location: "Sydney, NSW",
    category: "Dairy",
    delivery: true,
    pickup: false,
    expiry: "2023-12-10",
    rating: 4.8,
    reviews: 42,
    availableQuantity: 30,
    additionalImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: 3,
    name: "Raw Honey",
    description:
      "Pure, unfiltered honey from local beehives. Our bees forage on a diverse range of native Australian flowers, creating a honey with complex flavors and natural health benefits. This honey is never heated or processed, preserving all of its natural enzymes and beneficial properties.",
    price: 12.99,
    unit: "jar",
    image: "/placeholder.svg?height=400&width=400",
    farmer: "Buzzy Bee Apiary",
    farmerImage: "/placeholder.svg?height=100&width=100",
    location: "Melbourne, VIC",
    category: "Specialty",
    delivery: true,
    pickup: true,
    expiry: "2024-06-20",
    rating: 5.0,
    reviews: 56,
    availableQuantity: 25,
    additionalImages: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const productId = Number(params.id)
  const product = productsData.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const incrementQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        farmer: product.farmer,
        unit: product.unit,
      },
      quantity,
    )
  }

  // Calculate expiry date display
  const expiryDate = new Date(product.expiry)
  const formattedExpiry = expiryDate.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-lime-500">
            <ArrowLeft size={16} className="mr-2" />
            Back to results
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden border">
                <Image
                  src={selectedImage === 0 ? product.image : product.additionalImages[selectedImage - 1]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === 0 ? "border-lime-500" : "border-transparent"}`}
                >
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </button>
                {product.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === index + 1 ? "border-lime-500" : "border-transparent"}`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div> */}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                  <div className="flex">
                      {[...Array(5)].map((_, i) => {
                        const rating = product.rating

                        if (i < Math.floor(rating)) {
                          // full star
                          return <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                        } else if (i < rating) {
                          // half star (use a custom half-filled star or style)
                          return (
                            <div key={i} className="relative w-[18px] h-[18px]">
                              <Star className="text-gray-300 absolute top-0 left-0" size={18} />
                              <Star
                                className="text-yellow-400 absolute top-0 left-0 overflow-hidden"
                                size={18}
                                style={{ width: "50%", clipPath: "inset(0 50% 0 0)" }}
                              />
                            </div>
                          )
                        } else {
                          // empty star
                          return <Star key={i} size={18} className="text-gray-300" />
                        }
                      })}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={16} />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {product.delivery && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Truck size={16} className="text-lime-500" />
                      <span>Delivery Available</span>
                    </div>
                  )}
                  {product.pickup && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={16} className="text-lime-500" />
                      <span>Pickup Available</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-600 mb-6">
                  <Calendar size={16} />
                  <span>Best before: {formattedExpiry}</span>
                </div>
                <p className="text-gray-700 mb-6">{product.description}</p>
              </div>

              <div className="border-t border-b py-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                    <span className="text-lg font-normal text-gray-500">/{product.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.availableQuantity} {product.unit}s available
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.availableQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="pt-4">
                <h3 className="font-semibold mb-4">About the Farmer</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={product.farmerImage || "/placeholder.svg"}
                      alt={product.farmer}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.farmer}</h4>
                    <p className="text-gray-600 text-sm">{product.location}</p>
                    <Link href="#" className="text-lime-500 hover:text-lime-600 text-sm font-medium">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

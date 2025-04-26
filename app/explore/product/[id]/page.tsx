"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import axios from 'axios'; 
import { Star, Truck, MapPin, Calendar, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

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
  rating?: number; 
  reviews?: number; 
  availableQuantity?: number; 
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  farmer: string; 
  unit: string;
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; 

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<Product>(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err: any) { 
        console.error("Error fetching product:", err);
        if (err.response && err.response.status === 404) {
            setError('Product not found.');
        } else {
            setError('Failed to load product details. Please try again later.');
        }
        setProduct(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  const handleAddToCart = () => {
    if (!product) return;

    const cartItemData: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_link, 
      farmer: `Farmer ${product.farmer_id}`, 
      unit: product.unit,
    };

    addToCart(cartItemData, quantity);
    console.log(`${product.name} (x${quantity}) added to cart`);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <Image
          src="/placeholder.svg?height=150&width=150" 
          alt="Error"
          width={150}
          height={150}
          className="mb-4"
        />
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h2>
        <p className="text-lg text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => router.back()} 
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <Image
          src="/placeholder.svg?height=150&width=150"
          alt="Not Found"
          width={150}
          height={150}
          className="mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <button
          onClick={() => router.push('/explore')} 
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-6 text-green-700 hover:text-green-800 flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 mb-4">
                <Image
                  src={product.image_link || '/placeholder.svg'} 
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center mb-4 space-x-4">
                  {product.rating && product.reviews && (
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={20} fill="currentColor" />
                      <span className="text-lg font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
                      <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>
                  )}
                  <span className="text-gray-300">|</span>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-700 mb-5 leading-relaxed">{product.description}</p>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2 text-green-600" />
                    <span>Location: <span className="font-medium text-gray-800">{product.location}</span></span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2 text-green-600" />
                    <span>Best Before: <span className="font-medium text-gray-800">{new Date(product.expiry_date).toLocaleDateString()}</span></span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck size={18} className="mr-2 text-green-600" />
                    <span>Delivery: <span className={`font-medium ${product.delivery ? 'text-green-700' : 'text-red-600'}`}>{product.delivery ? 'Available' : 'Not Available'}</span></span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span>Pickup: <span className={`font-medium ${product.pickup ? 'text-green-700' : 'text-red-600'}`}>{product.pickup ? 'Available' : 'Not Available'}</span></span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-green-800">
                    ${product.price.toFixed(2)}
                    <span className="text-base text-gray-500 font-normal"> / {product.unit}</span>
                  </p>
                  {product.availableQuantity && (
                    <span className="text-sm text-green-600 font-medium">
                      {product.availableQuantity} {product.unit} available
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-5">
                  <label htmlFor="quantity" className="font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      readOnly 
                      className="w-12 text-center border-l border-r py-1.5 focus:outline-none"
                      min="1"
                      aria-label="Current quantity"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
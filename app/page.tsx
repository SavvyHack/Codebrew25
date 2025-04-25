"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, MapPin, ShoppingBag } from "lucide-react"
import VideoBackground from "@/app/components/VideoBackground"
import ProductCard from "@/app/components/ProductCard"

// Sample featured products
const featuredProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 5.99,
    unit: "kg",
    image: "/placeholder.svg?height=200&width=200",
    farmer: "Green Valley Farm",
  },
  {
    id: 2,
    name: "Free Range Eggs",
    price: 7.5,
    unit: "dozen",
    image: "/placeholder.svg?height=200&width=200",
    farmer: "Happy Hens Farm",
  },
  {
    id: 3,
    name: "Fresh Honey",
    price: 12.99,
    unit: "jar",
    image: "/placeholder.svg?height=200&width=200",
    farmer: "Buzzy Bee Apiary",
  },
  {
    id: 4,
    name: "Artisan Bread",
    price: 6.5,
    unit: "loaf",
    image: "/placeholder.svg?height=200&width=200",
    farmer: "Countryside Bakery",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
            <Image src="/logo.svg" alt="Farmazon Logo" width={120} height={120} className="mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-lime-500">Farm Fresh to Your Door</h1>
            <p className="text-xl mb-8">
              Connect directly with local farmers and enjoy the freshest produce Australia has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" className="btn-primary flex items-center justify-center gap-2">
                Explore Products <ArrowRight size={20} />
              </Link>
              <Link href="/auth/signup" className="btn-secondary flex items-center justify-center gap-2">
                Join Farmazon
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Farmazon Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-lime-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-lime-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Browse & Shop</h3>
              <p>Discover fresh produce directly from local farmers across Australia.</p>
            </div>
            <div className="text-center">
              <div className="bg-lime-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-lime-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Delivery Options</h3>
              <p>Choose between convenient home delivery or farm pickup options.</p>
            </div>
            <div className="text-center">
              <div className="bg-lime-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-lime-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Support Local</h3>
              <p>Support Australian farmers and enjoy the freshest seasonal produce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-lime-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/explore" className="text-lime-500 hover:text-lime-600 font-semibold flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Farmazon</h2>
              <p className="mb-4">
                Farmazon is revolutionizing how Australians access fresh, local produce by connecting farmers directly
                with consumers.
              </p>
              <p className="mb-4">
                Our mission is to support local agriculture, reduce food miles, and ensure you get the freshest produce
                possible while ensuring farmers receive fair compensation for their hard work.
              </p>
              <p className="mb-6">
                Whether you're a consumer looking for the freshest ingredients or a farmer looking to expand your
                market, Farmazon is the platform for you.
              </p>
              <Link href="/auth/signup" className="btn-primary inline-flex items-center">
                Join Our Community <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Farmers Market" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lime-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Farm Fresh?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Australians who are already enjoying direct access to the freshest local produce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?role=consumer"
              className="bg-white text-lime-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Sign Up as Consumer
            </Link>
            <Link
              href="/auth/signup?role=farmer"
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Sign Up as Farmer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

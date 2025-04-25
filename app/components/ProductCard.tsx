import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    unit: string
    image: string
    farmer: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <button className="absolute bottom-4 right-4 bg-lime-500 hover:bg-lime-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShoppingCart size={20} />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/explore/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-lime-500 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">by {product.farmer}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">
            ${product.price.toFixed(2)}
            <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

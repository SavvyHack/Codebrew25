
"use client";
import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, isLoading } = useCart();
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (isLoading) {
    return (
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div>Loading cart...</div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white rounded shadow p-4">
              <img src={`/product-pic-list/${item.image_link}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-600">${Number(item.price).toFixed(2)} / {item.unit}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 px-2 py-1 bg-red-400 text-white rounded">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold text-right pt-4">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </main>
  );
};

export default CartPage;



// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
// import { useCart } from "@/app/context/CartContext"
// import { useAuth } from "@/app/context/AuthContext"
// import { useRouter } from "next/navigation"

// export default function CartPage() {
//   const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
//   const { user } = useAuth()
//   const router = useRouter()

//   const [isUpdating, setIsUpdating] = useState(false)

//   const handleQuantityChange = (id: number, newQuantity: number) => {
//     setIsUpdating(true)
//     updateQuantity(id, newQuantity)
//     setTimeout(() => setIsUpdating(false), 500)
//   }

//   const handleRemove = (id: number) => {
//     setIsUpdating(true)
//     removeFromCart(id)
//     setTimeout(() => setIsUpdating(false), 500)
//   }

//   const handleCheckout = () => {
//     if (!user) {
//       router.push("/auth/signin?redirect=/checkout")
//     } else {
//       router.push("/checkout")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

//         {cartItems.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               alt="Empty cart"
//               width={120}
//               height={120}
//               className="mx-auto mb-6"
//             />
//             <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
//             <Link href="/explore" className="btn-primary inline-flex items-center">
//               Start Shopping <ArrowRight size={16} className="ml-2" />
//             </Link>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="md:col-span-2">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Shopping Cart ({cartItems.length} items)</h2>

//                   <div className="divide-y">
//                     {cartItems.map((item) => (
//                       <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4">
//                         <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
//                           <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex flex-col sm:flex-row sm:justify-between">
//                             <div>
//                               <h3 className="font-semibold text-lg">{item.name}</h3>
//                               <p className="text-gray-500 text-sm">by {item.farmer}</p>
//                               <p className="font-medium mt-1">
//                                 ${item.price.toFixed(2)}/{item.unit}
//                               </p>
//                             </div>
//                             <div className="mt-4 sm:mt-0">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                                   disabled={item.quantity <= 1 || isUpdating}
//                                   className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
//                                 >
//                                   <Minus size={14} />
//                                 </button>
//                                 <span className="w-8 text-center">{item.quantity}</span>
//                                 <button
//                                   onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                                   disabled={isUpdating}
//                                   className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
//                                 >
//                                   <Plus size={14} />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex justify-between items-center mt-4">
//                             <button
//                               onClick={() => handleRemove(item.id)}
//                               disabled={isUpdating}
//                               className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
//                             >
//                               <Trash2 size={14} className="mr-1" />
//                               Remove
//                             </button>
//                             <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
//                 <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span>${totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Shipping</span>
//                     <span>Calculated at checkout</span>
//                   </div>
//                   <div className="border-t pt-4 flex justify-between font-semibold">
//                     <span>Total</span>
//                     <span>${totalPrice.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="w-full btn-primary mt-6 py-3 flex items-center justify-center"
//                 >
//                   Proceed to Checkout <ArrowRight size={16} className="ml-2" />
//                 </button>

//                 <div className="mt-6">
//                   <Link
//                     href="/explore"
//                     className="text-lime-500 hover:text-lime-600 text-sm font-medium flex items-center justify-center"
//                   >
//                     Continue Shopping
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


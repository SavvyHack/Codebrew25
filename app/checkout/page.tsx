"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/context/CartContext"
import { useAuth } from "@/app/context/AuthContext"
import { CardElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios';

// Initialize stripe outside the component for optimization
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || 'fallback-public-key');
const stripePromise = loadStripe("pk_test_51RHyXMRIQQcuyebYC0P1MiVrs6vSR0k2BPwADSYByXuVUs1e2R2fmylh9yQBPcDz6ITwxnsTdoZvLwiiU6RuJ81U00kKRqpZmj");

function CheckoutPageContent() {
  const { cartItems, totalPrice } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [shippingDetails, setShippingDetails] = useState({ name: "", address: "", city: "" })

  // UseEffect to ensure router.push is only called on the client side
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin?redirect=/checkout")
    }
  }, [user, router]) // Trigger this effect only when 'user' changes

  const stripe = useStripe()
  const elements = useElements()

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(stripePromise);
    event.preventDefault()
    setIsProcessing(true)

    const orderData = {
      customer_id: null,  // Assuming the user is logged in and you have their `id`
      delivery_date: new Date().toISOString().split('T')[0], // Set current date as delivery date (or change as needed)
      status: 'pending', // Default status is pending
      items: cartItems,  // Or any other way you store the order items
      totalPrice: totalPrice,
    };

    try {
      // Send the order data to the backend API using axios
      const response = await axios.post('/api/orders', orderData);
  
      // Handle the response from the backend
      if (response.status === 201) {
        console.log('Order created successfully:', response.data);
        // You can redirect or show a success message here
        router.push('/order-success');
      }
    } catch (error) {
      console.error('Error submitting the order:', error);
    }

    try {
      // Create payment method using Stripe's API
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement)!,
      })

      if (paymentMethod?.error) {
        setErrorMessage(paymentMethod.error.message || null)
        setIsProcessing(false)
        return
      }

      // Simulate payment success and navigate
      setTimeout(() => {
        router.push("/order-success") // Redirect to success page
      }, 1500)
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          {/* Shipping Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleShippingChange}
                placeholder="Full Name"
                className="input-field"
                required
              />
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleShippingChange}
                placeholder="Address"
                className="input-field"
                required
              />
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleShippingChange}
                placeholder="City"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <CardElement />
          </div>

          {/* Order Summary */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              type="submit"
              disabled={isProcessing}
              className={`btn-primary py-3 px-6 ${isProcessing ? "opacity-50" : ""}`}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 text-red-600">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPageContent />
    </Elements>
  )
}

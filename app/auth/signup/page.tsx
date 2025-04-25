"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "consumer"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole as "farmer" | "consumer",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
<<<<<<< HEAD
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
=======
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
>>>>>>> 69813c65b64649525687b921122193f5ec9f53c3
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
<<<<<<< HEAD
          role: formData.role,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed")
=======
          type: formData.role === "consumer" ? "customer" : "farmer",
        }),
      });
  
      const responseText = await res.text(); // Get the response as raw text (HTML or plain text)
      console.log(responseText); // Log the raw response for debugging
  
      // Check if the response is OK (status code 200-299)
      if (res.ok) {
        // Optional: save user info to localStorage or context
        router.push(formData.role === "farmer" ? "/dashboard" : "/explore");
      } else {
        setErrors({
          form: responseText || "Failed to create account. Please try again.", // Show raw error message
        });
>>>>>>> 69813c65b64649525687b921122193f5ec9f53c3
      }
      
      router.push(formData.role === "farmer" ? "/dashboard" : "/explore")
    } catch (error: any) {
      setErrors({ form: error.message || "Failed to create account" })
    } finally {
      setIsSubmitting(false)
    }
<<<<<<< HEAD
  }
=======
  };
  
  
>>>>>>> 69813c65b64649525687b921122193f5ec9f53c3

  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo.svg" alt="Farmazon Logo" width={80} height={80} className="mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join Farmazon to connect with local farmers</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.form}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              I am a
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="consumer">Consumer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-70"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-lime-600 hover:text-lime-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
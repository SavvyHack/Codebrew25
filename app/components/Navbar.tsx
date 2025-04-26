"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useCart } from "@/app/context/CartContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Farmazon Logo" width={40} height={40} />
            <span
              className={`ml-2 font-bold text-xl ${isScrolled || pathname !== "/" ? "text-lime-500" : "text-white"}`}
            >
              Farmazon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${pathname === "/" ? "font-bold" : "font-medium"} ${isScrolled || pathname !== "/" ? "text-gray-800 hover:text-lime-500" : "text-white hover:text-lime-200"} transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`${pathname.startsWith("/explore") ? "font-bold" : "font-medium"} ${isScrolled || pathname !== "/" ? "text-gray-800 hover:text-lime-500" : "text-white hover:text-lime-200"} transition-colors`}
            >
              Explore product
            </Link>
            {user?.role === "farmer" && (
              <Link
                href="/dashboard"
                className={`${pathname.startsWith("/dashboard") ? "font-bold" : "font-medium"} ${isScrolled || pathname !== "/" ? "text-gray-800 hover:text-lime-500" : "text-white hover:text-lime-200"} transition-colors`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/cart"
              className={`relative ${isScrolled || pathname !== "/" ? "text-gray-800 hover:text-lime-500" : "text-white hover:text-lime-200"} transition-colors`}
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 ${isScrolled || pathname !== "/" ? "text-gray-800" : "text-white"}`}
                >
                  <User size={20} />
                  <span className="font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-lime-50">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-lime-50">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-lime-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className={`font-medium ${isScrolled || pathname !== "/" ? "text-gray-800 hover:text-lime-500" : "text-white hover:text-lime-200"} transition-colors`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? (
              <X size={24} className={isScrolled || pathname !== "/" ? "text-gray-800" : "text-white"} />
            ) : (
              <Menu size={24} className={isScrolled || pathname !== "/" ? "text-gray-800" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`${pathname === "/" ? "font-bold text-lime-500" : "font-medium text-gray-800"}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className={`${pathname.startsWith("/explore") ? "font-bold text-lime-500" : "font-medium text-gray-800"}`}
                onClick={closeMenu}
              >
                Explore
              </Link>
              {user?.role === "farmer" && (
                <Link
                  href="/dashboard"
                  className={`${pathname.startsWith("/dashboard") ? "font-bold text-lime-500" : "font-medium text-gray-800"}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}
              <Link href="/cart" className="font-medium text-gray-800 flex items-center" onClick={closeMenu}>
                <ShoppingCart size={20} className="mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="font-medium text-gray-800" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link href="/orders" className="font-medium text-gray-800" onClick={closeMenu}>
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                    className="font-medium text-gray-800 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth/signin" className="font-medium text-gray-800" onClick={closeMenu}>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

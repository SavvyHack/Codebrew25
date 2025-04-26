import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/app/components/Navbar"
import { AuthProvider } from "@/app/context/AuthContext"
import { CartProvider } from "@/app/context/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Farmazon - Farm Fresh to Your Door",
  description: "Direct farmer to consumer marketplace in Australia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-lime-500 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">About Farmazon</h3>
                    <p>Connecting farmers directly with consumers across Australia.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="/" className="hover:underline">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/explore" className="hover:underline">
                          Explore Products
                        </a>
                      </li>
                      <li>
                        <a href="/auth/signin" className="hover:underline">
                          Sign In
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Contact</h3>
                    <p>Email: realemail@farmazon.com</p>
                    <p>Phone: (69)FARMAZON</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-lime-400 text-center">
                  <p>&copy; {new Date().getFullYear()} Farmazon. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

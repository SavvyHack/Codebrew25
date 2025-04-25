"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-green-50 text-gray-900 p-4 md:p-8">
   
      <Navbar />
      <section className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to FARMAZON 🌾</h1>
        <p className="text-lg md:text-xl mb-8">
          A marketplace made by farmers, for farmers. Sell your fresh produce, tools, livestock, and more with ease.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl">
            Explore Products
          </button>
          <button className="border border-green-600 hover:bg-green-100 text-green-700 font-semibold py-3 px-6 rounded-xl">
            Become a Seller
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-2">Fresh Produce</h3>
          <p>Sell or buy vegetables, fruits, grains, and more directly from farms.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-2">Farming Equipment</h3>
          <p>Find affordable tools, tractors, irrigation systems, and more.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-2">Livestock & Feed</h3>
          <p>Connect with buyers and sellers of animals, feed, and breeding services.</p>
        </div>
      </section>

      <footer className="text-center mt-20 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FARMAZON. Empowering agriculture, one trade at a time.
      </footer>
    </main>
  );
}



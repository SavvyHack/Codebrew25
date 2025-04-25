"use client";

import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-green-50 text-gray-900 px-6 py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About FARMAZON 🌱</h1>
        <p className="text-lg mb-6">
          FARMAZON is a digital marketplace built to support farmers across the country by providing a direct and easy platform to sell their fresh produce, tools, and livestock.
        </p>
        <p>
          Our goal is to simplify agriculture commerce and empower rural communities with modern tools for trade.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-xl"
        >
          ← Go Back
        </button>
      </section>
    </main>
  );
}

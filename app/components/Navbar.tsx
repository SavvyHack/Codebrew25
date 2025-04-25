import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="w-full bg-white/90 shadow-md fixed top-0 left-0 z-50 flex justify-between items-center px-8 py-3">
      <div className="font-bold text-2xl text-green-700 tracking-tight">FARMAZON</div>
      <div className="flex gap-3 md:gap-5 items-center">
        <button
          onClick={() => router.push("/home/about")}
          className="transition-colors duration-200 bg-white border border-green-600 hover:bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-xl shadow"
        >
          About
        </button>
        <button
          onClick={() => router.push("/login")}
          className="transition-colors duration-200 bg-green-600 text-white border border-green-600 hover:bg-green-700 font-semibold px-4 py-2 rounded-xl shadow"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/signUp")}
          className="transition-colors duration-200 bg-white border border-green-600 hover:bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-xl shadow"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

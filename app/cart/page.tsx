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

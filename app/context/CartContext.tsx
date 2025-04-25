"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  image_link: string;
  price: number;
  unit: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on initial client-side render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem("shoppingCart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
          localStorage.removeItem("shoppingCart"); // Clear invalid data
        }
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Saving cart to localStorage:', cart);
      if (cart.length > 0) {
          localStorage.setItem("shoppingCart", JSON.stringify(cart));
      } else {
          // Clear storage if cart becomes empty to avoid loading an empty array string
          localStorage.removeItem("shoppingCart");
      }
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    console.log('Adding to cart:', item, 'Current cart:', cart);
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Ensure quantity doesn't go below 0 and remove item if it does
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(id);
    } else {
        setCart((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          )
        );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

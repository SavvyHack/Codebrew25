
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

// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
//   farmer: string
//   unit: string
// }

// interface CartContextType {
//   cartItems: CartItem[]
//   addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void
//   removeFromCart: (productId: number) => void
//   updateQuantity: (productId: number, quantity: number) => void
//   clearCart: () => void
//   totalItems: number
//   totalPrice: number
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([])

//   useEffect(() => {
//     // Load cart from localStorage
//     const storedCart = localStorage.getItem("farmazon_cart")
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart))
//     }
//   }, [])

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("farmazon_cart", JSON.stringify(cartItems))
//   }, [cartItems])

//   const addToCart = (product: Omit<CartItem, "quantity">, quantity: number) => {
//     setCartItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

//       if (existingItemIndex >= 0) {
//         // Update quantity if item already exists
//         const updatedItems = [...prevItems]
//         updatedItems[existingItemIndex].quantity += quantity
//         return updatedItems
//       } else {
//         // Add new item to cart
//         return [...prevItems, { ...product, quantity }]
//       }
//     })
//   }

//   const removeFromCart = (productId: number) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
//   }

//   const updateQuantity = (productId: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(productId)
//       return
//     }

//     setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
//   }

//   const clearCart = () => {
//     setCartItems([])
//   }

//   const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }

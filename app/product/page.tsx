'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useCart, CartProvider } from '../context/CartContext';

interface Product {
  id: number;
  category: string;
  name: string;
  image_link: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  farmer_id: number;
  produce_at: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={`/product-pic-list/${product.image_link}`}
        alt={product.name}
        className="h-40 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "product-pic-list/placeholder.png";
        }}
      />
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-green-600 font-semibold text-xl">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="text-gray-500 ml-1">/{product.unit}</span>
          </div>
          <div>
            {!cartItem ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  image_link: product.image_link,
                  price: product.price,
                  unit: product.unit
                })}
              >
                Add to Cart!
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  disabled={cartItem.quantity <= 1}
                >
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="ml-2 bg-red-400 text-white px-2 py-1 rounded"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to fetch products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
    
<a href="/cart" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
  Checkout ({cart.length})
</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

const Page = () => (
  <CartProvider>
    <ProductPage />
  </CartProvider>
);

export default Page;

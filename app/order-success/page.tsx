"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const OrderSuccessPage = () => {
  const [order, setOrder] = useState<any>(null);  // State to store the order data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state
  const router = useRouter();
  
  // Retrieve the orderId from the query string or URL params (if provided)
  const orderId = new URLSearchParams(window.location.search).get('orderId');
  
  useEffect(() => {
    if (orderId) {
      // Fetch the order details from the backend using the orderId
      axios
        .get(`/api/orders/${orderId}`)
        .then((response) => {
          setOrder(response.data);  // Store order details in the state
          setLoading(false);  // Set loading to false after data is fetched
        })
        .catch((error) => {
          setError('Failed to fetch order details');  // Handle error
          setLoading(false);
        });
    } else {
      setError('Order ID is missing');  // If no orderId is present in the URL
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Success</h1>
        
        {/* Display Order Details */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer Name:</strong> {order.name}</p>
          <p><strong>Address:</strong> {order.address}, {order.city}</p>
          <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          <p><strong>Delivery Date:</strong> {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
          
          <h3 className="mt-6 text-xl font-semibold">Items:</h3>
          <ul>
            {order.items && JSON.parse(order.items).map((item: any, index: number) => (
              <li key={index} className="mb-2">
                {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Optional: Add a button to go back to the home page */}
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

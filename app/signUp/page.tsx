'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import axios from 'axios'; // Import axios

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<'customer' | 'farmer'>('customer'); // Default to customer
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password) {
        setError('Email and password are required.');
        setIsLoading(false);
        return;
    }

    try {
      // Use axios.post instead of fetch
      const response = await axios.post('/api/users/signUp', {
        email,
        password,
        type: userType,
      });

      // Axios automatically checks for non-2xx responses and throws an error
      // Success data is in response.data
      console.log('Signup successful:', response.data);

      setSuccess('Sign up successful! Redirecting to login...');
      // Optionally clear form
      setEmail('');
      setPassword('');
      setUserType('customer');

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      // Handle potential Axios error structure
      let errorMessage = 'An unexpected error occurred.';
      if (axios.isAxiosError(err) && err.response) {
        // Use the error message from the server response if available
        errorMessage = err.response.data.message || 'Failed to sign up';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">I am a:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'customer' | 'farmer')}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          >
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
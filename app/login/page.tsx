'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'; // Import Link for navigation

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      // TODO: Handle successful login (e.g., store token, redirect)
      // For now, just redirect to a dashboard or home page
      router.push('/'); // Redirect to home page after login

    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || 'Login failed. Please check your credentials.';
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
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
          <Link href="/signUp" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Need an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
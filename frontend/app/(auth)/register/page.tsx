'use client'; // This directive makes it a Client Component

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import Image from 'next/image';

export default function RegisterPage() {
  // State hooks to manage form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State hooks for feedback
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); // Hook for programmatic navigation

  // Form submission handler
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    // 1. Client-Side Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    setIsLoading(true); // Disable button and show loading state

    // 2. API Call
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      // 3. Handle API Response
      if (!response.ok) {
        setError(data.message || 'An unexpected error occurred.');
      } else {
        alert('Registration successful! Please proceed to login.');
        router.push('/login'); // Redirect to the login page
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  // 4. The JSX for the form
  return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
      >
                                <div className="flex justify-center mb-4">
                    <Image src="/rewear-logo.ico" alt="Rewear Logo" width={100} height={100} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Create an Account</h2>
        <p className="text-center text-gray-600 mb-6">Join the ReWear community.</p>
        
        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username"                                         className="block text-sm font-medium text-black">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring focus:border-red-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email"                                         className="block text-sm font-medium text-black">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring focus:border-red-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password"                                         className="block text-sm font-medium text-black">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring focus:border-red-500"
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-black">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring focus:border-red-500"
            required
          />
        </div>

        {/* Error Message Display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
                                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Registering...' : 'Register'}
                </button>

        {/* Link to Login */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
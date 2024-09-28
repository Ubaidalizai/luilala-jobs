import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        fullName,
        email,
        password,
      };

      const response = await axios.post('http://127.0.0.1:3000/api/v1/users/register', userData);
        console.log(response);
      if (response.status === 201) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful registration
        }, 2000);
      } else {
        setMessage(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mt-8">Register</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-gray-700 font-medium">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
            className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Register
        </button>
        {message && <div className="text-gray-600 text-sm mt-4 text-center">{message}</div>}
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { forgotPassword } from '../../Services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Password reset link sent to your email!');
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

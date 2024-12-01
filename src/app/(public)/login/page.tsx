// src/app/public/login/page.tsx

'use client'; // Ensure this is at the top for client-side rendering

import { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect or perform actions on successful login
      window.location.href = '/dashboard'; // Redirect to dashboard
    } else {
      // Handle error response
      setError(data.message || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-6 text-2xl font-semibold text-center'>Login</h2>
        {error && <p className='mb-4 text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='block w-full p-2 border border-gray-300 rounded-md'
              placeholder='you@example.com'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='block w-full p-2 border border-gray-300 rounded-md'
              placeholder='Your password'
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className={`w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

'use client'; // Ensure this is at the top for client-side rendering

import { useState } from 'react';

import Loader from '@/app/components/Loader';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/v1/login', {
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
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <div
        className='flex items-center justify-center min-h-screen bg-cover bg-center'
        style={{
          backgroundImage: 'url(/images/threads-166858_1920.jpg)',
          backgroundSize: 'cover', // Ensures the image covers the entire background
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          backgroundPosition: 'center', // Centers the image
        }}
      >
        <div className='lg:w-full max-w-lg p-8 bg-white dark:bg-gray-700 rounded-lg shadow-lg md:p-10 opacity-80'>
          <h2 className='mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white'>
            Welcome Back
          </h2>
          {error && (
            <div className='mb-4 p-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded'>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
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
                className='block w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                placeholder='Your password'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className={`w-full p-3 text-white rounded-lg font-semibold transition-colors duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className='mt-4 text-sm text-center text-gray-600 dark:text-gray-100'>
            Don’t have an account?{' '}
            <a href='/register' className='text-blue-600 hover:underline'>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

'use client'; // Ensure this is at the top for client-side rendering

import { motion } from 'framer-motion'; // Import framer-motion
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Loader from '@/app/components/Loader';

const Login: React.FC = () => {
  const router = useRouter();
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
        // window.location.href = '/dashboard'; // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Handle error response
        setLoading(false);
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <motion.div
        className='flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-200 dark:bg-gray-700'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}

        // style={{
        //   backgroundImage: 'url(/images/threads-166858_1920.jpg)',
        //   backgroundSize: 'cover', // Ensures the image covers the entire background
        //   backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        //   backgroundPosition: 'center', // Centers the image
        // }}
      >
        <div className='lg:w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:p-10'>
          <motion.h2
            className='mb-6 text-3xl font-bold text-center text-black dark:text-white'
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Welcome Back
          </motion.h2>
          {error && (
            <div className='mb-4 p-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded'>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-4 text-black dark:text-white'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                placeholder='you@example.com'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                placeholder='Your password'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className={`w-full p-3 rounded-lg font-semibold transition-colors duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className='mt-4 text-sm text-center dark:text-gray-100'>
            Don’t have an account?{' '}
            <a href='/register' className='text-blue-600 hover:underline'>
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

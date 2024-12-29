// src/app/public/register/page.tsx

'use client'; // Ensure this is at the top for client-side rendering

import { useState } from 'react';

import Footer from '@/app/components/customer/common/footer';
import NavBar from '@/app/components/customer/common/navbar';
import Wrapper from '@/app/components/wrapper';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'user',
          isActive: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
        }, 3000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper nav={NavBar} footer={Footer}>
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600'>
        <div className='w-full max-w-lg p-8 bg-white rounded-lg shadow-lg md:p-10'>
          <h2 className='mb-6 text-3xl font-bold text-center text-gray-800'>
            Create Your Account
          </h2>
          {error && (
            <div className='mb-4 p-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded'>
              {error}
            </div>
          )}
          {success && (
            <div className='mb-4 p-4 text-sm text-green-600 bg-green-100 border border-green-400 rounded'>
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='First Name'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='lastName'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='Last Name'
              />
            </div>
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
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
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
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='Create a password'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='confirmPassword'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='Confirm your password'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phoneNumber'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Phone Number
              </label>
              <input
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='123-456-7890'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='location'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleInputChange}
                required
                className='block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500'
                placeholder='Your city'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className={`w-full p-3 text-white rounded-lg font-semibold transition-colors duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <p className='mt-4 text-sm text-center text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='text-green-600 hover:underline'>
              Login
            </a>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;

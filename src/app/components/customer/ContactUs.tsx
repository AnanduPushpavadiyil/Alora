import { motion } from 'framer-motion'; // Import framer-motion
import React, { useState } from 'react';

import GoogleMap from '@/app/components/customer/GoogleMap';
import GoogleReview from '@/app/components/customer/GoogleReview';
import { NotificationType } from '@/app/components/hooks/toastify/enums';
import useToast from '@/app/components/hooks/toastify/useToast';
import Loader from '@/app/components/Loader';

const ContactUs: React.FC = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast('Review Submitted! Thank you for your feedback.', {
        type: NotificationType.Success,
      });

      const form = event.target as HTMLFormElement;
      form.reset();
    }, 2000); // Delay of 2 seconds
  };

  return (
    <div>
      {isLoading && <Loader />}

      <motion.div
        className='min-h-screen bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className='text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100'
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        <div className='flex flex-col md:flex-row md:space-x-10 w-full max-w-6xl'>
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:w-1/2'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Form Inputs */}
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Phone Number
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='find-us'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                How did you find us?{' '}
                <span className='text-gray-500'>(Optional)</span>
              </label>
              <input
                type='text'
                id='find-us'
                name='find-us'
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={4}
                required
                className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none'
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-500 focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-800'
            >
              Submit
            </button>
          </motion.form>

          {/* Google Map */}
          <GoogleMap />
        </div>

        {/* Google Reviews */}
        <GoogleReview />
      </motion.div>
    </div>
  );
};

export default ContactUs;

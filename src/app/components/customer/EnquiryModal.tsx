import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { NotificationType } from '@/app/components/hooks/toastify/enums';
import useToast from '@/app/components/hooks/toastify/useToast';
import Loader from '@/app/components/Loader';

const EnquiryModal: React.FC = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast('Enquiry Submitted! Thank you for reaching out.', {
        type: NotificationType.Success,
      });

      // Reset the form using form.reset()
      const form = event.target as HTMLFormElement;
      form.reset();

      // Close the modal after submission
      onClose();
    }, 2000); // Simulate a delay of 2 seconds
  };

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {!isOpen ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-[10%] right-0 z-40 flex flex-row items-center w-[220px] gap-2 rounded-l-lg bg-gradient-to-r to-gray-200 from-gray-600 dark:to-gray-700 dark:from-gray-200 text-white max-sm:flex sm:h-[50px] md:h-[60px] lg:h-[72px] xl:h-[80px] group overflow-hidden'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon/Decoration */}
          <span className='p-2'>
            <Image
              src='./images/search.png'
              alt='Logo'
              width={40}
              height={40}
            />
          </span>

          {/* Text Content */}
          <span className='p-2'>
            <p className='text-black dark:text-white md:text-[12px] lg:text-[14px] xl:text-[16px] text-sm'>
              Enquire Now <br />
              Get in Touch
            </p>
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'
        >
          {isLoading && <Loader />}
          <motion.div
            className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
            >
              &times;
            </button>
            <form onSubmit={handleSubmit}>
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
                  Email (Optional)
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Phone Number (Optional)
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
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Message (Optional)
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  className='mt-1 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  resize-none'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md disabled:opacity-50'
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EnquiryModal;

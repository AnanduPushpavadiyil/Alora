import { motion } from 'framer-motion'; // Import framer-motion
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { dummyReviews } from '@/app/components/customer/common/dummyData';

type ReviewType = {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
};

const GoogleReview: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedReview, setSelectedReview] = useState<ReviewType | null>(null); // Selected review

  useEffect(() => {
    setLoading(true);
    // Simulate API call with dummy data
    setTimeout(() => {
      setReviews(dummyReviews);
      setLoading(false);
    }, 1000);
  }, []);

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [isModalOpen]);

  const openModal = (review: ReviewType) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <motion.div
      className='mt-10 w-full px-4 h-[50%]'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
    >
      <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
        Google Reviews
      </h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div className='relative'>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className='mt-4'
            autoplay={{
              delay: 10000, // Set delay to 10 seconds (10000ms)
              reverseDirection: true,
              disableOnInteraction: true,
            }}
            loop={true}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div
                  className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-[150px] cursor-zoom-in' // Set fixed height
                  onClick={() => openModal(review)} // Open modal on review click
                >
                  <div className='flex items-center'>
                    <Image
                      src={review.profile_photo_url}
                      alt='User Profile'
                      width={300}
                      height={400}
                      className='w-12 h-12 rounded-full mr-4'
                    />
                    <div>
                      <p className='font-semibold text-gray-800 dark:text-gray-100'>
                        {review.author_name}
                      </p>
                      <p className='text-yellow-500'>
                        {'★'.repeat(review.rating || 1)}
                      </p>
                    </div>
                  </div>
                  <p className='mt-2 text-gray-700 dark:text-gray-300 h-[calc(100%-60px)] overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {review.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className='cursor-pointer text-2xl custom-prev absolute top-1/2 -left-6 transform -translate-y-1/2 text-gray-800 dark:text-gray-100'
            aria-label='Previous'
          >
            ❮
          </button>
          <button
            className='cursor-pointer text-2xl custom-next absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-800 dark:text-gray-100'
            aria-label='Next'
          >
            ❯
          </button>
        </div>
      ) : (
        <p>No reviews available.</p>
      )}

      {/* Modal for review details */}
      {isModalOpen && selectedReview && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 cursor-zoom-out'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <motion.div
            className='relative dark:bg-gray-800 bg-white p-4 rounded-lg z-40 w-[80%] md:w-[60%]'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex items-center'>
              <Image
                src={selectedReview.profile_photo_url}
                alt='User Profile'
                width={300}
                height={400}
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <p className='font-semibold text-gray-800 dark:text-gray-100'>
                  {selectedReview.author_name}
                </p>
                <p className='text-yellow-500'>
                  {'★'.repeat(selectedReview.rating || 1)}
                </p>
              </div>
            </div>
            <p className='mt-2 text-gray-700 dark:text-gray-300'>
              {selectedReview.text}
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GoogleReview;

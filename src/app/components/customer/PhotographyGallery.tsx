import { motion } from 'framer-motion'; // Import framer-motion
import Image from 'next/image';

import { products } from '@/app/components/customer/common/dummyData';

const PhotographyGallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((image, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-lg shadow-lg relative group border-4 border-white dark:border-gray-800 bg-white perspective-1000'
          >
            <div className='shadow-md hover:shadow-xl absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-opacity duration-300' />
            <div className='group-hover:rotate-3d group-hover:scale-105 transition-all duration-500 transform hover:scale-105 hover:rotate-3d hover:perspective-1000'>
              <Image
                src={image.image}
                alt={image.name}
                width={image.width}
                height={image.height}
                className='filter grayscale-90 hover:filter-none hover:grayscale-0 w-full h-auto object-cover transition-all duration-300 group-hover:w-[105%] group-hover:scale-105 group-hover:filter-none group-hover:grayscale-1'
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PhotographyGallery;

import { motion } from 'framer-motion'; // For animation
import Image from 'next/image';
import { useEffect, useState } from 'react'; // For managing state and side effects

import { Product, products } from '@/app/components/customer/common/dummyData';

const PhotographyGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [selectedImage, setSelectedImage] = useState<Partial<Product> | null>(
    null
  ); // Store the selected image, can be null initially

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
    }

    // Cleanup to reset when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleImageClick = (image: Product) => {
    setSelectedImage(image); // Set the selected image
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Reset the selected image
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((image, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-lg shadow-lg relative group border-4 border-white dark:border-gray-800 bg-white perspective-1000 cursor-zoom-in'
            >
              <div className='shadow-md hover:shadow-xl absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-opacity duration-300' />
              <div
                className='group-hover:rotate-3d group-hover:scale-105 transition-all duration-500 transform hover:scale-105 hover:rotate-3d hover:perspective-1000'
                onClick={() => handleImageClick(image)} // Open modal on hover
              >
                <Image
                  src={image.image}
                  alt={image.name}
                  width={image.width}
                  height={image.height}
                  className='hover:filter-none hover:grayscale-0 w-full h-auto object-cover transition-all duration-300 group-hover:w-[105%] group-hover:scale-105 group-hover:filter-none group-hover:grayscale-1'
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal for image */}
      {isModalOpen && selectedImage && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 cursor-zoom-out'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <motion.div
            className='relative dark:bg-gray-800 bg-white p-4 rounded-lg z-40' // Ensure modal content is above the overlay
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image with larger size */}
            <Image
              src={selectedImage?.image || ''}
              alt={selectedImage?.name || 'Selected Image'}
              width={(selectedImage?.width || 0) * 2} // Make the image bigger
              height={(selectedImage?.height || 0) * 2} // Make the image bigger
              className='w-auto h-auto object-cover max-w-[90vw] max-h-[90vh]' // Ensure image stays within the viewport
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotographyGallery;

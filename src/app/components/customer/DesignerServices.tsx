import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Corrected CSS import for newer Swiper versions

import { designerServices } from '@/app/components/customer/common/dummyData';

const DesignerServices = () => {
  return (
    <motion.div
      className='w-full px-4 h-[50%]'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 10000, // Set delay to 10 seconds (10000ms)
          reverseDirection: true,
          disableOnInteraction: true, // Autoplay will not stop after user interactions
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className='flex justify-center'
      >
        {designerServices.map((service, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className=' relative w-full h-80 bg-cover bg-center dark:text-white text-black text-center flex flex-col justify-center items-center'
              style={{
                backgroundImage: `url(${service.imageUrl}), radial-gradient(circle, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className='dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 p-6 rounded-lg w-[80%]'>
                <h2 className='text-4xl font-bold mb-4'>{service.title}</h2>
                <p className='text-xl'>{service.description}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default DesignerServices;

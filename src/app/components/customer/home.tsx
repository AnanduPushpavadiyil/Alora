import { motion } from 'framer-motion'; // Import framer-motion

import DesignerServices from '@/app/components/customer/DesignerServices';
import EnquiryModal from '@/app/components/customer/EnquiryModal';
import GoogleReview from '@/app/components/customer/GoogleReview';
import PhotographyGallery from '@/app/components/customer/PhotographyGallery';

const Home: React.FC = () => {
  return (
    <motion.div
      className='min-h-screen bg-cover bg-center bg-gray-200 dark:bg-gray-700'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Highlighted Section for Designer Stitching & Wedding Dresses */}
      <section className='dark:bg-gray-700 bg-gray-200 py-8'>
        <DesignerServices />
      </section>
      {/* Existing Sections */}
      <section className='p-6 bg-gray-200 dark:bg-gray-700'>
        <GoogleReview />
      </section>
      {/* Featured Products */}
      <section className='p-6 bg-gray-200 dark:bg-gray-700'>
        <PhotographyGallery />
      </section>
      <section className='dark:bg-gray-700 bg-gray-200 py-8'>
        <EnquiryModal />
      </section>
    </motion.div>
  );
};

export default Home;

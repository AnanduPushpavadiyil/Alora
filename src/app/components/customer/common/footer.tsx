import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className=' bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
      <div className='max-w-screen-lg mx-auto px-4 py-8'>
        {/* Social Media & Contact Section */}
        <div className='text-center py-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='flex justify-center space-x-8 mb-6'
          >
            <a
              href='https://www.instagram.com/alor.adesigner'
              className='text-3xl hover:text-pink-500 transition-colors duration-300'
            >
              <FaInstagram />
            </a>
            <a
              href='https://www.facebook.com'
              className='text-3xl hover:text-blue-600 transition-colors duration-300'
            >
              <FaFacebook />
            </a>
            <a
              href='https://wa.me/1234567890'
              className='text-3xl hover:text-green-500 transition-colors duration-300'
            >
              <FaWhatsapp />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className='text-lg'
          >
            <p className='mb-2'>
              <a
                href='mailto:support@premiumtextiles.com'
                className='hover:underline'
              >
                <FaEnvelope className='inline mr-2' />{' '}
                support@premiumtextiles.com
              </a>
            </p>
            <p>
              <a href='tel:+1234567890' className='hover:underline'>
                <FaPhoneAlt className='inline mr-2' /> +91 8714471236
              </a>
            </p>
          </motion.div>
        </div>

        {/* Navigation Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='text-center py-6'
        >
          <div className='flex justify-center space-x-6 mb-4'>
            <motion.button
              className='text-gray-400 hover:text-white transition-all duration-300'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              About Us
            </motion.button>
            <motion.button
              className='text-gray-400 hover:text-white transition-all duration-300'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Privacy Policy
            </motion.button>
            <motion.button
              className='text-gray-400 hover:text-white transition-all duration-300'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Terms of Service
            </motion.button>
          </div>
          <p className='text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} Premium Textiles. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

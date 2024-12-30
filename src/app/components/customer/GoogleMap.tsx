import { motion } from 'framer-motion'; // Import framer-motion

const GoogleMap: React.FC = () => {
  return (
    <motion.div
      className='mt-8 md:mt-0 md:w-1/2 h-64 md:h-auto'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.755123456789!2d76.292446163987!3d10.0144704946955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d2e6165c6df%3A0xb4ae147700301467!2sAlora+designer+stiching+center!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
        width='100%'
        height='100%'
        style={{ border: '0' }}
        allowFullScreen={true}
        loading='lazy'
        className='rounded-lg shadow-lg'
      ></iframe>
    </motion.div>
  );
};

export default GoogleMap;

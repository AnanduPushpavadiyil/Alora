const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-800 text-white text-center p-6'>
      <div className='flex justify-center space-x-6 mb-4'>
        <button className='hover:underline'>About Us</button>
        <button className='hover:underline'>Privacy Policy</button>
        <button className='hover:underline'>Terms of Service</button>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Premium Textiles. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

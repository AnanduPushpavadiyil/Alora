// src/app/public/about/page.tsx
const AboutPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <header className='bg-blue-600 text-white p-4 text-center w-full'>
        <h1 className='text-4xl font-bold'>About Us</h1>
      </header>
      <main className='p-6 max-w-2xl bg-white rounded-lg shadow-md mt-6'>
        <h2 className='text-2xl font-semibold mb-4'>Who We Are</h2>
        <p className='mb-4'>
          Welcome to Our Textiles Shop! We are dedicated to providing
          high-quality fabrics for all your sewing needs. Our extensive
          selection includes cotton, silk, wool, and many more.
        </p>
        <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
        <p>
          Our mission is to offer the finest textiles and unparalleled customer
          service. Whether you're a professional designer or a DIY enthusiast,
          we have something for everyone!
        </p>
      </main>
      <footer className='bg-gray-800 text-white text-center p-4 mt-6 w-full'>
        <p>
          &copy; {new Date().getFullYear()} Our Textiles Shop. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;

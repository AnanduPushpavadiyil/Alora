'use client';

import Footer from '@/app/components/customer/common/footer';
import NavBar from '@/app/components/customer/common/navbar';

// Ensure this is at the top for client-side rendering

const Wrapper: React.FC<{
  children: React.ReactNode;
  path?: string;
}> = ({ children, path }) => {
  return (
    <>
      <div className='min-h-screen bg-theme-primary'>
        <div className=''>
          <NavBar path={path} />
        </div>
        <div className='bg-gray-200 dark:bg-gray-700 pt-24'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Wrapper;

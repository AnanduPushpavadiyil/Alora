'use client'; // Ensure this is at the top for client-side rendering

import Navbar from '@/app/components/admin/common/navbar';
import Sidebar from '@/app/components/admin/common/sidebar';

const Wrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='min-h-screen bg-theme-primary'>
      <div className=''>
        <Navbar />
      </div>
      <div className='flex'>
        <div className='border-gray-900 '>
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

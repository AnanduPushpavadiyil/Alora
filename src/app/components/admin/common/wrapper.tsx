// Dynamic Wrapper component
'use client';
import React, { useState } from 'react';

import NavBar from '@/app/components/admin/common/navbar';
import Sidebar from '@/app/components/admin/common/sidebar';
import Dashboard from '@/app/components/admin/dashboard';
import Entry from '@/app/components/admin/Entry';
import Photo from '@/app/components/admin/Photo';
import Loader from '@/app/components/Loader';

const Wrapper: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('Dashboard');

  const renderContent = () => {
    switch (title) {
      case 'Dashboard':
        return <Dashboard setLoading={setLoading} />;
      case 'Entry':
        return <Entry />;
      case 'Photo':
        return <Photo />;
      default:
        return <Dashboard setLoading={setLoading} />;
    }
  };

  return (
    <div
      className='min-h-screen bg-gray-200 dark:bg-gray-700'
      // style={{
      //   backgroundImage: 'url(/images/threads-166858_1920.jpg)',
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      // }}
    >
      {loading && <Loader />}
      <div className='pt-4 px-4 fixed z-40 w-full'>
        <NavBar setTitle={setTitle} title={title} />
      </div>
      <div className='flex pt-24'>
        <div className='border-gray-800 opacity-90'>
          <Sidebar setTitle={setTitle} title={title} />
        </div>
        <div className='space-y-4 m-4 rounded-md w-full overflow-y-auto opacity-90'>
          {title && (
            <div className='bg-white dark:bg-gray-800 rounded-md p-4'>
              <h2 className='text-2xl font-semibold text-center'>{title}</h2>
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 rounded-md p-4 h-[calc(85vh-6rem)]'>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

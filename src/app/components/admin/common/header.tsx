'use client';

import { useState } from 'react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <header className='bg-white p-6 text-center shadow-md'>
      <h2 className='text-3xl font-semibold text-blue-800'>
        Explore the Best Fabrics for Every Need
      </h2>
      <p className='text-gray-600 mt-2'>
        From luxury silk to everyday cotton, we’ve got it all.
      </p>
      <div className='flex mt-6 justify-center space-x-2'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search products...'
          className='w-72 p-2 border rounded-md'
        />
        <button
          onClick={handleSearch}
          className='bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition'
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;

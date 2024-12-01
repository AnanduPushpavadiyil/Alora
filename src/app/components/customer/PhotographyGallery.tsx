import Image from 'next/image';

import { products } from '@/app/components/customer/common/dummyData';

const PhotographyGallery = () => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((image, index) => (
          <div
            key={index}
            className='overflow-hidden rounded shadow relative group'
          >
            <div className='shadow-md hover:shadow-lg absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-50 transition-opacity duration-300' />
            <Image
              src={image.image}
              alt={image.name}
              width={image.width}
              height={image.height}
              className='filter grayscale-90 hover:filter-none hover:grayscale-0 w-full h-auto object-cover transition-all duration-300 group-hover:w-[105%]  group-hover:scale-105 group-hover:filter-none group-hover:grayscale-1'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotographyGallery;

import PhotographyGallery from '@/app/components/customer/PhotographyGallery';

const Home: React.FC = () => {
  const categories = ['Cotton', 'Silk', 'Wool', 'Linen', 'Velvet'];

  return (
    <div className=' min-h-screen bg-cover bg-center'>
      <section className='p-6 bg-gray-200 dark:bg-gray-700'>
        <h3 className='text-2xl font-semibold text-blue-800 text-center mb-6'>
          Browse by Categories
        </h3>
        <div className='flex flex-wrap justify-center gap-4'>
          {categories.map((category) => (
            <button
              key={category}
              className='bg-white dark:bg-gray-800 shadow-md p-4 rounded-md hover:shadow-lg transition'
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <main className='p-6 bg-gray-100 dark:bg-gray-800'>
        {/* <h3 className='text-2xl font-semibold text-blue-800 text-center mb-6'>
          Featured Products
        </h3> */}
        {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white dark:text-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition'
            >
              <Image
                src={product.image}
                alt={product.name}
                width={product.width}
                height={product.height}
                className='w-full h-48 object-cover rounded-md mb-4'
              />
              <h4 className='text-lg font-semibold datk:text-gray-800'>
                {product.name}
              </h4>
              <p className='dark:text-gray-400 text-gray-500 mb-4'>
                {product.price}
              </p>
              <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
                Add to Cart
              </button>
            </div>
          ))}
        </div> */}
        <PhotographyGallery />
      </main>
    </div>
  );
};

export default Home;

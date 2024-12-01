import Image from 'next/image';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import NavBar from '@/components/home/navbar';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  width: number;
  height: number;
}

const Home: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Cotton Fabric',
      price: '$10.00',
      image: '/images/cotton-fabric.jpg',
      width: 300,
      height: 400,
    },
    {
      id: 2,
      name: 'Silk Fabric',
      price: '$20.00',
      image: '/images/silk-fabric.jpg',
      width: 300,
      height: 400,
    },
    {
      id: 3,
      name: 'Wool Fabric',
      price: '$15.00',
      image: '/images/wool-fabric.jpg',
      width: 300,
      height: 400,
    },
  ];

  const categories = ['Cotton', 'Silk', 'Wool', 'Linen', 'Velvet'];

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <NavBar />
      <Header />
      Categories
      <section className='p-6 bg-gray-200'>
        <h3 className='text-2xl font-semibold text-blue-800 text-center mb-6'>
          Browse by Categories
        </h3>
        <div className='flex flex-wrap justify-center gap-4'>
          {categories.map((category) => (
            <button
              key={category}
              className='bg-white shadow-md p-4 rounded-md hover:shadow-lg transition'
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Featured Products */}
      <main className='p-6 bg-gray-100'>
        <h3 className='text-2xl font-semibold text-blue-800 text-center mb-6'>
          Featured Products
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition'
            >
              <Image
                src={product.image}
                alt={product.name}
                width={product.width}
                height={product.height}
                className='w-full h-48 object-cover rounded-md mb-4'
              />
              <h4 className='text-lg font-semibold text-gray-800'>
                {product.name}
              </h4>
              <p className='text-gray-600 mb-4'>{product.price}</p>
              <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

'use client'; // Client-side rendering
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className='bg-blue-700 text-white p-4 flex justify-between items-center shadow-md'>
      <div className='flex items-center space-x-4'>
        <Image src='/images/2023-03-17.jpg' alt='Logo' width={50} height={50} />
        <h1 className='text-xl font-bold'>Alora</h1>
      </div>
      <div className='hidden sm:flex space-x-6'>
        <button
          onClick={handleLogin}
          className='hover:text-gray-200 transition'
        >
          Login
        </button>
        <button className='hover:text-gray-200 transition'>Sign Up</button>
        <button className='hover:text-gray-200 transition'>Contact Us</button>
      </div>
      <div className='sm:hidden'>
        <button className='hover:text-gray-200 transition'>Menu</button>
      </div>
    </nav>
  );
};

export default NavBar;

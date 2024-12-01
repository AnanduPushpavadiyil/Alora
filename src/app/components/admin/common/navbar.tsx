'use client'; // Client-side rendering
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';

import { handleLogoutApi } from '@/app/apiCall';
import { sidebar } from '@/app/components/admin/common/config';
import Loader from '@/app/components/Loader';

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter(); // For navigation after logout

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await handleLogoutApi();
      if (response) {
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      {loading && <Loader />}
      <nav className='flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800 opacity-70 '>
        <div className='flex items-center space-x-4'>
          <div className='sm:hidden'>
            <button
              onClick={toggleMenu}
              className='text-gray-700 dark:text-white hover:text-gray-200 transition cursor-pointer'
            >
              <FaBars size={24} />
            </button>
          </div>
          <Image
            src='/images/2023-03-17.jpg'
            alt='Logo'
            width={50}
            height={50}
          />
          <h1 className='text-xl font-bold'>Alora</h1>
        </div>

        <div className='flex space-x-6'>
          <Link
            href='#'
            onClick={handleLogout}
            className='hover:text-gray-200 transition cursor-pointer'
          >
            Logout
          </Link>

          <Link
            href='#'
            onClick={toggleTheme}
            className='hover:text-gray-200 transition cursor-pointer'
          >
            <div className='flex items-center space-x-4 '>
              <div
                className={`p-1 rounded-full transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {theme === 'dark' ? (
                  <FaSun className='text-yellow-500' />
                ) : (
                  <FaMoon className='text-blue-500' />
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Side Modal */}
        {isMenuOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-40'>
            <div className='fixed top-0 left-0 dark:bg-gray-700 bg-gray-100 w-64 h-full z-50 p-4'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='dark:text-white text-black text-lg font-bold'>
                  Menu
                </h2>

                <button
                  onClick={toggleMenu}
                  className='dark:text-white text-black hover:text-gray-200 transition'
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className='flex flex-col space-y-4'>
                {sidebar.map((item, index) => (
                  <Link
                    key={index}
                    className='hover:text-gray-200  hover:bg-blue-500 transition'
                    href={item.link}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;

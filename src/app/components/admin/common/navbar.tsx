'use client'; // Client-side rendering
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';

import { handleLogoutApi } from '@/app/apiCall';
import { sidebar } from '@/app/components/admin/common/config';
import Loader from '@/app/components/Loader';

const NavBar: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
}> = ({ title, setTitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter(); // For navigation after logout

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0); // Track the last scroll position
  const [showNav, setShowNav] = useState(false); // Track the visibility of the navbar

  // Track if the mouse is near the top
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
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
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > lastScrollPosition) {
      setShowNav(false);
    } else if (scrollPosition < lastScrollPosition) {
      setShowNav(true);
    }

    setLastScrollPosition(scrollPosition);
  }, [scrollPosition, lastScrollPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If the mouse is near the top, show the navbar
      if (e.clientY < 50) {
        setIsMouseNearTop(true);
      } else {
        setIsMouseNearTop(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Show the navbar when the mouse is near the top and it's currently hidden
    if (isMouseNearTop && scrollPosition > 50 && !showNav) {
      setShowNav(true);
    }

    // Hide the navbar when the mouse leaves the top
    if (!isMouseNearTop && scrollPosition > 50 && showNav) {
      setShowNav(false);
    }
  }, [isMouseNearTop, scrollPosition, showNav]);

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [isMenuOpen]);

  if (!mounted) return null;
  return (
    <div>
      {loading && <Loader />}
      {!isMenuOpen ? (
        <nav
          className={`rounded-md opacity-90 bg-white dark:bg-gray-800  flex justify-between  items-center  p-2 px-4 shadow-md transform transition-all duration-1000 ease-in-out z-40 backdrop-blur-md `}
        >
          <div className='flex items-center space-x-4 gap-8'>
            <div className='sm:hidden'>
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className='text-gray-700 dark:text-white dark:hover:text-gray-200 hover:text-gray-800 transition cursor-pointer'
              >
                <FaBars size={24} />
              </button>
            </div>

            <Image
              src='./images/logo-removebg-preview.png'
              alt='Logo'
              width={200}
              height={100}
              className='filter invert brightness-200 dark:filter-none dark:invert-0 dark:brightness-100 hover:scale-130 transition-all duration-500  '
            />
          </div>

          <div className='flex space-x-6'>
            <div className='hidden sm:flex gap-2'>
              {/* {sidebar
                .filter((item) => (path ? item.link !== path : item))
                .map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className='dark:hover:text-gray-600 dark:hover:bg-gray-200 hover:text-gray-200 hover:bg-gray-600 border dark:border-gray-200 border-gray-700 p-2 rounded-md transition cursor-pointer'
                  >
                    <div className='flex gap-1'>
                      {item.icon && (
                        <div>
                          {React.createElement(item.icon, {
                            size: '20',
                          })}
                        </div>
                      )}
                      {item.text}
                    </div>
                  </Link>
                ))} */}
              <Link
                href='#'
                onClick={handleLogout}
                className='dark:hover:text-gray-600 dark:hover:bg-gray-200 hover:text-gray-200 hover:bg-gray-600 border dark:border-gray-200 border-gray-700 p-2 rounded-md transition cursor-pointer'
              >
                Logout
              </Link>
            </div>
            <Link
              href='#'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className='hover:text-gray-200 transition cursor-pointer'
            >
              <div className='flex items-center space-x-4 pt-1  '>
                <div
                  className={`p-2 rounded-full transition ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-200 text-white'
                      : 'bg-gray-200 hover:bg-gray-700 text-black'
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
        </nav>
      ) : (
        <div
          className='fixed inset-0 bg-black z-50 duration-300'
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
        >
          <div
            className=' w-full fixed top-0 left-0 dark:bg-gray-700 bg-white h-full z-40 p-6 shadow-xl transform transition-all duration-300'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className='flex justify-between items-center mb-8'>
              <h2 className='dark:text-white text-black text-lg font-semibold'>
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className='dark:text-white text-black hover:text-gray-500 transition duration-200'
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className='flex flex-col gap-2 space-y-8 h-[calc(90vh-3rem)] justify-between'>
              <div className='flex flex-col gap-2 '>
                {sidebar.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200 text-theme-text hover:rounded pt-4 ${
                      title === item.text &&
                      'dark:bg-gray-800 bg-gray-200 rounded border dark:border-white border-black'
                    }`}
                    onClick={() => setMenuOpen(false)} // Close the menu when an item is clicked
                  >
                    <a
                      onClick={() => {
                        setTitle(item.text);
                      }}
                      className='flex gap-2'
                    >
                      {item.text}
                    </a>
                  </div>
                ))}
              </div>
              <div className='dark:hover:text-white dark:hover:bg-gray-800 hover:text-black hover:bg-gray-200 border dark:border-gray-200 border-gray-700 p-4 rounded-md transition cursor-pointer'>
                <a onClick={handleLogout} className='flex gap-2'>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

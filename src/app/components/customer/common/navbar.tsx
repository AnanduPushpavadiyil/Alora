'use client'; // Client-side rendering
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';

import { navbar } from '@/app/components/customer/common/config';

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0); // Track the last scroll position
  const [showNav, setShowNav] = useState(false); // Track the last scroll position

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

  if (!mounted) return null;

  return (
    <nav
      className={`fixed flex justify-between items-center w-full p-4 shadow-md transition-all duration-300 ease-in-out ${
        scrollPosition > 1000
          ? showNav
            ? 'opacity-100'
            : 'opacity-0'
          : 'opacity-100'
      } bg-slate-100 dark:bg-gray-800 z-50`}
    >
      <div className='flex items-center space-x-4 gap-8'>
        <div className='sm:hidden'>
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className='text-gray-700 dark:text-white hover:text-gray-200 transition cursor-pointer'
          >
            <FaBars size={24} />
          </button>
        </div>
        <Image
          src='./images/2023-03-17.jpg'
          alt='Logo'
          width={50}
          height={50}
        />
        {/* <h1 className='text-xl font-bold'>Alora</h1> */}
        <div className='logo relative'>
          <h2 className='first dark:text-gray-600  text-gray-400 absolute text-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-stroke:2px_#05a8f3]'>
            Alora
          </h2>
          <h2 className='second absolute text-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-gray-100 dark:hover:text-[#3B82F6] hover:text-[#3B82F6] text-gray-800 [text-stroke:2px_#05a8f3] animate-waves'>
            Alora
          </h2>
        </div>
      </div>

      <div className='flex space-x-6'>
        <div className='hidden sm:flex gap-2'>
          {navbar.map((item, index) => (
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
          ))}
        </div>
        <Link
          href='#'
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className='hover:text-gray-200 transition cursor-pointer'
        >
          <div className='flex items-center space-x-4 pt-1  '>
            <div
              className={`p-2 rounded-full transition border-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-200 text-white border-gray-200'
                  : 'bg-gray-200 hover:bg-gray-800 text-black border-gray-700'
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
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
        >
          <div
            className='fixed top-0 left-0 dark:bg-gray-700 bg-gray-100 w-64 h-full z-50 p-4'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className='flex justify-between items-center mb-6'>
              <h2 className='dark:text-white text-black text-lg font-bold'>
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className='dark:text-white text-black hover:text-gray-200 transition'
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className='flex flex-col space-y-4'>
              {navbar.map((item, index) => (
                <Link
                  key={index}
                  className='hover:text-gray-200 hover:bg-blue-500 transition p-2 rounded'
                  href={item.link}
                  onClick={() => setMenuOpen(false)} // Close the menu when an item is clicked
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

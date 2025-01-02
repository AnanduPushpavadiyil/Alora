import React from 'react';

import { sidebar } from '@/app/components/admin/common/config';

const Sidebar: React.FC<{
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}> = ({ title, setTitle }) => {
  return (
    <aside className='space-y-4 w-64 hidden md:block ml-4 mt-4 overflow-y-auto'>
      <div className='p-4 bg-white py-3 dark:bg-gray-800 rounded-md'>
        <ul className='space-y-4'>
          {sidebar
            .filter((item) => (title ? item.text === title : item))
            .map((item, index) => (
              <li
                key={index}
                className='px-4 py-2 text-theme-text hover:rounded'
              >
                <div
                  onClick={() => {
                    setTitle(item.text);
                  }}
                  className='flex gap-2'
                >
                  {item.icon && (
                    <div>
                      {React.createElement(item.icon, {
                        size: '20',
                      })}
                    </div>
                  )}
                  {item.text}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className='pt-4 p-4 bg-white dark:bg-gray-800 h-[calc(85vh-6rem)] rounded-md'>
        <ul className='space-y-4'>
          {sidebar
            .filter((item) => (title ? item.text !== title : item))
            .map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer  text-theme-text hover:border-b  hover:border-black dark:hover:border-white ${
                  title === item.text && 'dark:bg-gray-800 bg-white rounded '
                }`}
              >
                <div
                  onClick={() => {
                    setTitle(item.text);
                  }}
                  className='flex gap-2'
                >
                  {item.icon && (
                    <div>
                      {React.createElement(item.icon, {
                        size: '20',
                      })}
                    </div>
                  )}
                  {item.text}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

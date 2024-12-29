import Link from 'next/link';
// const Sidebar = () => {
//   return (
//     <div className='lg:flex lg:w-64 hidden bg-blue-700 text-white h-full'>
//       <div className='flex flex-col w-full h-full py-10'>
//         <div className='flex-1 overflow-y-auto'>
//           <ul>
//             <li className='px-4 py-2 hover:bg-blue-500 cursor-pointer'>
//               <Link href='#'>Dashboard</Link>
//             </li>
//             <li className='px-4 py-2 hover:bg-blue-500 cursor-pointer'>
//               <Link href='#'>Profile</Link>
//             </li>
//             <li className='px-4 py-2 hover:bg-blue-500 cursor-pointer'>
//               <Link href='#'>Settings</Link>
//             </li>
//             <li className='px-4 py-2 hover:bg-blue-500 cursor-pointer'>
//               <Link href='#'>Messages</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Sidebar;
// components/Sidebar.js
import React from 'react';

import { sidebar } from '@/app/components/admin/common/config';

const Sidebar = () => {
  return (
    <aside className='space-y-4 w-64 p-4 hidden md:block bg-background '>
      <ul className='space-y-4'>
        {sidebar.map((item, index) => (
          <li
            key={index}
            className='px-4 py-2 hover:font-bold cursor-pointer hover:bg-primary text-theme-text'
          >
            <Link href={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

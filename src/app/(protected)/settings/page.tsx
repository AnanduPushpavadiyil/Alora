'use client'; // Ensure this is at the top for client-side rendering

import { useState } from 'react';

const SettingsPage = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // Add logic to save the settings, e.g., making an API call
    alert('Settings saved!');
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <header className='bg-blue-600 text-white p-4 text-center w-full'>
        <h1 className='text-4xl font-bold'>Settings</h1>
      </header>
      <main className='p-6 max-w-md bg-white rounded-lg shadow-md mt-6'>
        <h2 className='text-2xl font-semibold mb-4'>User Settings</h2>
        <div className='mb-4'>
          <label className='block mb-2'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className='mr-2'
            />
            Receive Notifications
          </label>
        </div>
        <button
          onClick={handleSave}
          className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200'
        >
          Save Settings
        </button>
      </main>
      <footer className='bg-gray-800 text-white text-center p-4 mt-6 w-full'>
        <p>
          &copy; {new Date().getFullYear()} Our Textiles Shop. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default SettingsPage;

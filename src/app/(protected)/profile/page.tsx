// src/app/profile/page.tsx
'use client'; // Ensure this is at the top for client-side rendering

import { useEffect, useState } from 'react';

// Define an interface for the user data
interface UserProfile {
  email: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data: UserProfile = await response.json();
        setUser(data);
      } catch (error) {
        const typedError = error as {
          message?: string;
        };
        setError(typedError.message || '');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-2xl font-semibold text-center'>Profile</h2>
        {user ? (
          <div>
            <p className='mb-2'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='mb-2'>
              <strong>Joined:</strong>{' '}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

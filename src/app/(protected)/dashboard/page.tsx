// src/app/dashboard/page.tsx
'use client'; // Ensure this is at the top for client-side rendering
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardData {
  username: string;
  email: string;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter(); // For navigation after logout

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/v1/dashboard', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data: DashboardData = await response.json();
        setData(data);
      } catch (error: unknown) {
        // Narrow the type of `error`
        if (error instanceof Error) {
          setError(error.message); // Access the `message` property of `Error`
        } else {
          setError('An unexpected error occurred'); // Handle unexpected error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/v1/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for logout
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Logout failed.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'An error occurred during logout.');
      } else {
        setError('An unexpected error occurred during logout.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-2xl font-semibold text-center'>Dashboard</h2>
        {data ? (
          <div>
            <p className='mb-2'>
              <strong>Welcome, {data.username}!</strong>
            </p>
            <p className='mb-2'>
              <strong>Email:</strong> {data.email}
            </p>
            <p className='mb-2'>
              <strong>Joined:</strong>{' '}
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
            {/* Add more dashboard-specific information here */}
          </div>
        ) : (
          <p>No dashboard data available.</p>
        )}
        <button
          onClick={handleLogout}
          className='mt-4 w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

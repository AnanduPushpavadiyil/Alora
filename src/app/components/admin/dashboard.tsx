import { useEffect, useState } from 'react';

import { fetchDashboardApi } from '@/app/apiCall';

const Dashboard: React.FC<{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLoading }) => {
  const [data, setData] = useState<{
    firstName?: string;
    email?: string;
    createdAt?: string;
  }>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await fetchDashboardApi();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setLoading]);

  if (error) return <p className='text-red-500'>{error}</p>;
  return (
    <div className='p-2'>
      {data ? (
        <div>
          <p className='mb-2'>
            <strong>Welcome, {data?.firstName || 'N/A'}!</strong>
          </p>
          <p className='mb-2'>
            <strong>Email:</strong> {data.email || 'N/A'}
          </p>
          <p className='mb-2'>
            <strong>Joined:</strong>{' '}
            {new Date(data.createdAt || '').toLocaleDateString() || 'N/A'}
          </p>
        </div>
      ) : (
        <p>No dashboard data available.</p>
      )}
    </div>
  );
};

export default Dashboard;

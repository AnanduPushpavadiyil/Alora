'use client'; // Ensure this is at the top for client-side rendering

import { useEffect, useState } from 'react';

import { fetchDashboardApi } from '@/app/apiCall';
import Wrapper from '@/app/components/admin/common/wrapper';
import Dashboard from '@/app/components/admin/dashboard';
import Loader from '@/app/components/Loader';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<null>(null);
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
  }, []);

  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div>
      {loading && <Loader />}
      <Wrapper>
        <Dashboard data={data} />
      </Wrapper>
    </div>
  );
};

export default DashboardPage;

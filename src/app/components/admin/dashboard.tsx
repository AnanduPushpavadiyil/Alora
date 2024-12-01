const Dashboard: React.FC<{ data: unknown }> = ({ data }) => {
  return (
    <div className='min-h-screen m-4 '>
      <h2 className='mb-4 text-2xl font-semibold text-center'>Dashboard</h2>
      {data ? (
        <div>
          <p className='mb-2'>
            <strong>Welcome, {data?.firstName} !</strong>
          </p>
          <p className='mb-2'>
            <strong>Email:</strong> {data.email}
          </p>
          <p className='mb-2'>
            <strong>Joined:</strong>{' '}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>No dashboard data available.</p>
      )}
    </div>
  );
};

export default Dashboard;

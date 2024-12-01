export const fetchDashboardApi = async () => {
  const response = await fetch('/api/v1/user', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch dashboard data');

  return await response.json();
};

export const handleLogoutApi = async () => {
  const response = await fetch('/api/v1/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch dashboard data');

  return await response.json();
};

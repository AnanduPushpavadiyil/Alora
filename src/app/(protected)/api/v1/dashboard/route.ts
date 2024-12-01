import { NextResponse } from 'next/server';

interface User {
  email: string;
  password: string;
}

interface DashboardData {
  username: string;
  email: string;
  createdAt: string;
}

// Dummy user data (replace with real authentication or database logic)
const user: User = {
  email: 'user@example.com',
  password: 'password123',
};

export const GET = async () => {
  const dashboardData: DashboardData = {
    username: 'John Doe', // Replace with dynamic user data if needed
    email: user.email,
    createdAt: '2024-01-01T12:00:00Z',
  };

  return NextResponse.json(dashboardData);
};

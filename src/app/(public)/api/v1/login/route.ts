// src/app/api/login/route.ts
import { NextResponse } from 'next/server';

interface User {
  email: string;
  password: string;
}

// Dummy user data for demonstration purposes (replace with real authentication)
const user: User = {
  email: 'user@example.com',
  password: 'password123', // In a real app, never hardcode passwords
};

// POST request for login
export const POST = async (request: Request) => {
  const { email, password }: { email: string; password: string } =
    await request.json();

  // Simple authentication check
  if (email === user.email && password === user.password) {
    // Set a cookie for the session (this is a simple example, use secure methods in production)
    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('token', 'your-jwt-token-here', { httpOnly: true }); // Set a cookie with a JWT token (replace 'your-jwt-token-here' with actual token)
    return res;
  }

  // If the authentication fails, return a 401 Unauthorized response
  return NextResponse.json(
    { message: 'Invalid email or password' },
    { status: 401 }
  );
};

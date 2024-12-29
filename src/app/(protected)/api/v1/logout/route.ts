// src/app/api/v1/logout/route.ts
import { NextResponse } from 'next/server';

export const POST = async () => {
  const res = NextResponse.json({ message: 'Logout successful' });

  // Expire the token by setting an empty token with an immediate expiry
  res.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
  res.cookies.set('userId', '', { httpOnly: true, expires: new Date(0) });

  return res;
};

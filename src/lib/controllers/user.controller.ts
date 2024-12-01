import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import UserService from '@/lib/services/user.service';
import { UserType } from '@/lib/type';
import { catchAsync } from '@/lib/utils/catchAsync';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const createUser = catchAsync(async (req: NextRequest) => {
  const { firstName, lastName, email, password, phoneNumber, location, role } =
    await req.json();
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !location
  ) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 400 }
    );
  }

  const existingUser = await UserService.getUserEmail(email);

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email already exists.' },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: UserType = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    location,
    role: role ? role : 'user',
    isActive: true,
  };

  const user = await UserService.createUser(newUser);

  return NextResponse.json(user, { status: 200 });
});

export const listUsers = catchAsync(async () => {
  const user = await UserService.listUsers();
  return NextResponse.json(user, { status: 200 });
});

export const getUserById = catchAsync(async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json('User ID is required.', {
      status: 400,
    });
  }
  if (typeof id !== 'string') {
    return NextResponse.json('User ID must be a string.', {
      status: 400,
    });
  }

  const user = await UserService.getUserById(id);

  if (!user) {
    return NextResponse.json('User not found.', { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
});

export const getUserEmail = catchAsync(async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json('Email is required.', {
      status: 400,
    });
  }
  if (typeof email !== 'string') {
    return NextResponse.json('Email must be a string.', {
      status: 400,
    });
  }

  const user = await UserService.getUserEmail(email);

  if (!user) {
    return NextResponse.json('User not found.', { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
});

export const updateUser = catchAsync(async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json('User ID is required.', {
      status: 400,
    });
  }
  if (typeof id !== 'string') {
    return NextResponse.json('User ID must be a string.', {
      status: 400,
    });
  }

  let updatedData;
  try {
    updatedData = await req.json(); // Ensure the body is properly parsed as JSON
  } catch {
    return NextResponse.json('Invalid JSON body.', { status: 400 });
  }

  const user = await UserService.updateUser(id, updatedData);

  if (!user) {
    return NextResponse.json('User not found or update failed.', {
      status: 404,
    });
  }

  return NextResponse.json(user, { status: 200 });
});

export const deleteUser = catchAsync(async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json('User ID is required.', {
      status: 400,
    });
  }
  if (typeof id !== 'string') {
    return NextResponse.json('User ID must be a string.', {
      status: 400,
    });
  }

  const user = await UserService.deleteUser(id);

  if (!user) {
    return NextResponse.json('User not found or deletion failed.', {
      status: 404,
    });
  }

  return NextResponse.json(
    { message: 'User deleted successfully.' },
    {
      status: 200,
    }
  );
});

export const login = catchAsync(async (request: NextRequest) => {
  const { email, password }: { email: string; password: string } =
    await request.json();

  if (!email) {
    return NextResponse.json('Email is required.', {
      status: 400,
    });
  }
  if (typeof email !== 'string') {
    return NextResponse.json('Email must be a string.', {
      status: 400,
    });
  }

  const user = await UserService.getUserEmail(email);

  if (!user) {
    return NextResponse.json('User not found.', { status: 404 });
  }

  if (email === user.email) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const res = NextResponse.json({ message: 'Login successful' });

      res.cookies.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.cookies.set('userId', user.id, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return res;
    }
  }

  return NextResponse.json(
    { message: 'Invalid email or password' },
    { status: 401 }
  );
});

export const getUserByCookie = catchAsync(async (req: NextRequest) => {
  const id = req.cookies.get('userId')?.value;

  if (!id) {
    return NextResponse.json('User ID is required.', {
      status: 400,
    });
  }
  if (typeof id !== 'string') {
    return NextResponse.json('User ID must be a string.', {
      status: 400,
    });
  }

  const user = await UserService.getUserById(id);

  if (!user) {
    return NextResponse.json('User not found.', { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
});

export const userController = {
  createUser,
  listUsers,
  getUserById,
  getUserEmail,
  updateUser,
  deleteUser,
  login,
  getUserByCookie,
};

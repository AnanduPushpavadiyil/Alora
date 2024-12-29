import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/lib/controllers/user.controller';

export const GET = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.listUsers(request, response);
  return NextResponse.json(user);
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.createUser(request, response);
  return user;
};

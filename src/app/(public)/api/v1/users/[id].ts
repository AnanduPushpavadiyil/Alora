import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/lib/controllers/user.controller';

export const GET = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.getUserById(request, response);
  return NextResponse.json(user);
};
export const PUT = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.updateUser(request, response);
  return NextResponse.json(user);
};
export const DELETE = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.deleteUser(request, response);
  return NextResponse.json(user);
};

import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/lib/controllers/user.controller';

export const POST = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.login(request, response);
  return user;
};

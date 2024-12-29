import { NextRequest, NextResponse } from 'next/server';

import { userController } from '@/lib/controllers/user.controller';

export const GET = async (request: NextRequest, response: NextResponse) => {
  const user = await userController.getUserByCookie(request, response);
  return user;
};

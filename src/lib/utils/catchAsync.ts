import clsx, { ClassValue } from 'clsx';
import { NextRequest, NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const catchAsync = (
  fn: (req: NextRequest, res: NextResponse) => Promise<NextResponse>
) => {
  return (req: NextRequest, res: NextResponse) => {
    return fn(req, res).catch((err) => {
      // Log the error for debugging
      // console.error('Error caught in catchAsync:', err);

      // Send a generic error response
      return NextResponse.json(
        { error: err.message || 'Internal Server Error' },
        { status: 500 }
      );
    });
  };
};

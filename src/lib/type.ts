import mongoose, { Document } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ICategory extends Document {
  name: string;
  description: string;
  measurementsRequired: string[];
  pricePerUnit: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVisit extends Document {
  userId: mongoose.Types.ObjectId;
  visitedAt: Date;
  advance: number;
  pendingAmount: number;
  color: string;
  materialTypeId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  pics: string[];
  measurementsId: mongoose.Types.ObjectId;
  deliveryDate: Date;
  note: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  location: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  profilePic: string | null;
  email: string;
  password: string;
  phoneNumber: string;
  location: string;
  addresses: IAddress[];
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMeasurement extends Document {
  visitId: mongoose.Types.ObjectId;
  measurements: Record<string, number>;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaterial extends Document {
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaterial extends Document {
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export interface MethodHandlers {
  [method: string]: HandlerFunction;
}

export type UserType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  location?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

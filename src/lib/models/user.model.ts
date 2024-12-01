import mongoose, { Schema } from 'mongoose';

import { IAddress, IUser } from '@/lib/type';

const AddressSchema = new Schema<IAddress>({
  location: { type: String, required: true },
  isDefault: { type: Boolean, required: true, default: false },
});

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePic: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  addresses: { type: [AddressSchema], required: true },
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;

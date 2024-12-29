import mongoose, { Document, Schema } from 'mongoose';

import { tokenTypes } from '@/lib/config/constants';

// import { toJSON } from './plugins';
// import { tokenTypes } from '../config/constants';

// Define the AdminAuthToken interface
interface AdminAuthToken extends Document {
  token: string;
  admin: mongoose.Schema.Types.ObjectId;
  type:
    | typeof tokenTypes.REFRESH
    | typeof tokenTypes.RESET_PASSWORD
    | typeof tokenTypes.ACCESS;
  expires: Date | null;
  blacklisted: boolean;
}

// Define the AdminAuthToken schema
const adminAuthtokenSchema = new Schema<AdminAuthToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.ACCESS],
      required: true,
    },
    expires: {
      type: Date,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
// adminAuthtokenSchema.plugin(toJSON);

// Create the model
const AdminAuthToken = mongoose.model<AdminAuthToken>(
  'AdminAuthToken',
  adminAuthtokenSchema
);

export default AdminAuthToken;

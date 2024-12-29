import mongoose, { Schema } from 'mongoose';

import { IMaterial } from '@/lib/type';

const MaterialSchema = new Schema<IMaterial>({
  type: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Material =
  mongoose.models.Material ||
  mongoose.model<IMaterial>('Material', MaterialSchema);
export default Material;

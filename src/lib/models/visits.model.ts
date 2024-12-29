import mongoose, { Schema } from 'mongoose';

import { IVisit } from '@/lib/type';

const VisitSchema = new Schema<IVisit>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  visitedAt: { type: Date, default: Date.now },
  advance: { type: Number, required: true },
  pendingAmount: { type: Number, required: true },
  color: { type: String, required: true },
  materialTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true,
  },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  pics: { type: [String], default: [] },
  measurementsId: {
    type: Schema.Types.ObjectId,
    ref: 'Measurement',
    required: true,
  },
  deliveryDate: { type: Date, required: true },
  note: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Visit =
  mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);
export default Visit;

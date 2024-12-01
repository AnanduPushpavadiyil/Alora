import mongoose, { Document, Schema } from 'mongoose';

interface IMeasurement extends Document {
  visitId: mongoose.Types.ObjectId;
  measurements: Record<string, number>;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

const MeasurementSchema = new Schema<IMeasurement>({
  visitId: { type: Schema.Types.ObjectId, ref: 'Visit', required: true },
  measurements: { type: Map, of: Number, required: true },
  unit: { type: String, default: 'inches' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Measurement =
  mongoose.models.Measurement ||
  mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
export default Measurement;

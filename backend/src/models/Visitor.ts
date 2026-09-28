import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  ip?: string;
  country?: string;
  city?: string;
  timestamp: Date;
}

const VisitorSchema = new Schema<IVisitor>(
  {
    ip: { type: String, default: 'Unknown' },
    country: { type: String, default: 'Unknown' },
    city: { type: String, default: 'Unknown' },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

VisitorSchema.index({ timestamp: -1 });

export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);
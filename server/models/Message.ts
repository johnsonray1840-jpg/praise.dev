import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  body: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

MessageSchema.index({ createdAt: -1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
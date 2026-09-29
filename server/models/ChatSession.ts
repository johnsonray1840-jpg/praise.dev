import mongoose, { Schema, Document } from 'mongoose';

export interface IChatSession extends Document {
  sessionId: string;
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

ChatSessionSchema.index({ updatedAt: -1 });

export default mongoose.models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
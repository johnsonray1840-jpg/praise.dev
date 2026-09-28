import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  image?: string;
  deployedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    liveUrl: { type: String, required: true },
    repoUrl: { type: String, required: true },
    image: { type: String },
    deployedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ createdAt: -1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
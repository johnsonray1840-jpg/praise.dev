import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
  experience?: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    experience: { type: String },
    details: { type: String },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, proficiency: -1 });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
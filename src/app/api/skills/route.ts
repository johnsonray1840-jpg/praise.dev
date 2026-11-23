import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Skill from '../../../../server/models/Skill';

export const DEFAULT_SKILLS = [
  { _id: '1', name: 'JavaScript', category: 'Frontend', proficiency: 95 },
  { _id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
  { _id: '3', name: 'React', category: 'Frontend', proficiency: 92 },
  { _id: '4', name: 'Next.js', category: 'Frontend', proficiency: 90 },
  { _id: '5', name: 'TailwindCSS', category: 'Frontend', proficiency: 95 },
  { _id: '6', name: 'Three.js', category: 'Frontend', proficiency: 85 },
  { _id: '7', name: 'Node.js', category: 'Backend', proficiency: 88 },
  { _id: '8', name: 'Express.js', category: 'Backend', proficiency: 85 },
  { _id: '9', name: 'PHP', category: 'Backend', proficiency: 80 },
  { _id: '10', name: 'MongoDB', category: 'Database', proficiency: 90 },
  { _id: '11', name: 'Docker', category: 'DevOps', proficiency: 85 },
  { _id: '12', name: 'AWS', category: 'DevOps', proficiency: 78 },
  { _id: '13', name: 'Git', category: 'Tools', proficiency: 92 },
  { _id: '14', name: 'Postman', category: 'Tools', proficiency: 88 },
  { _id: '15', name: 'Render & Vercel', category: 'Platforms', proficiency: 90 },
  { _id: '16', name: 'SaaS Architecture', category: 'Architecture', proficiency: 85 },
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(DEFAULT_SKILLS);
    }
    const skills = await Skill.find().sort({ proficiency: -1 });
    if (!skills || skills.length === 0) {
      return NextResponse.json(DEFAULT_SKILLS);
    }
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(DEFAULT_SKILLS);
  }
}

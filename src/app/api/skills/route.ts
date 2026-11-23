import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DEFAULT_SKILLS } from '@/lib/defaults';
import Skill from '../../../../server/models/Skill';

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

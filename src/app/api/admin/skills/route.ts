import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Skill from '../../../../../server/models/Skill';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { name, category, proficiency } = await req.json();

    if (!name || !category || proficiency === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (proficiency < 0 || proficiency > 100) {
      return NextResponse.json({ error: 'Proficiency must be between 0 and 100' }, { status: 400 });
    }

    const skill = await Skill.create({ name, category, proficiency });
    return NextResponse.json(skill, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Skill from '../../../../../../server/models/Skill';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { id } = await params;
    const { name, category, proficiency } = await req.json();

    if (proficiency !== undefined && (proficiency < 0 || proficiency > 100)) {
      return NextResponse.json({ error: 'Proficiency must be between 0 and 100' }, { status: 400 });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, category, proficiency },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { id } = await params;
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Skill deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}

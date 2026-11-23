import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Project from '../../../../../../server/models/project';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

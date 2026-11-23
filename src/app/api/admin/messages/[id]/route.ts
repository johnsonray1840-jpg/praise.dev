import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Message from '../../../../../../server/models/Message';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const { id } = await params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}

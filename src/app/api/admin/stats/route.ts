import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Project from '../../../../../server/models/project';
import Skill from '../../../../../server/models/Skill';
import Visitor from '../../../../../server/models/Visitor';
import Message from '../../../../../server/models/Message';

export async function GET(req: NextRequest) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ projects: 4, skills: 16, visitors: 1, messages: 0 });
    }

    const [projectsCount, skillsCount, visitorsCount, messagesCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Visitor.countDocuments(),
      Message.countDocuments(),
    ]);

    return NextResponse.json({
      projects: projectsCount,
      skills: skillsCount,
      visitors: visitorsCount,
      messages: messagesCount,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

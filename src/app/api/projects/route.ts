import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DEFAULT_PROJECTS } from '@/lib/defaults';
import Project from '../../../../server/models/project';

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }

    const projects = await Project.find().sort({ createdAt: 1 });
    if (!projects || projects.length === 0) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(DEFAULT_PROJECTS);
  }
}

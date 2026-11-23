import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DEFAULT_PROJECTS } from '@/lib/defaults';
import Project from '../../../../server/models/project';

const REMOVED_PROJECT_TITLES = [
  /^ct corporation/i,
  /^crisis sentinel/i,
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }

    // Remove deprecated projects from MongoDB record
    await Project.deleteMany({
      $or: [
        { title: { $in: REMOVED_PROJECT_TITLES } },
        { liveUrl: { $regex: /crisis-sentinel|ctcorporation/i } },
      ],
    }).catch(() => {});

    // Ensure Jay's Food Court is persisted in MongoDB so it always appears
    await Project.findOneAndUpdate(
      { liveUrl: 'https://jays-food-court.vercel.app' },
      {
        $setOnInsert: {
          title: "Jay's Food Court",
          description: 'Modern digital restaurant & food ordering platform with interactive menu browsing, seamless cart experience, and fast checkout.',
          techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Vercel'],
          liveUrl: 'https://jays-food-court.vercel.app',
          repoUrl: 'https://github.com/johnsonray1840-jpg',
          deployedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    ).catch(() => {});

    const projects = await Project.find().sort({ createdAt: -1 });
    if (!projects || projects.length === 0) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(DEFAULT_PROJECTS);
  }
}

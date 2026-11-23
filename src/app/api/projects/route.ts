import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '../../../../server/models/project';

export const DEFAULT_PROJECTS = [
  {
    _id: 'default-0',
    title: "Jay's Food Court",
    description: 'Modern digital restaurant & food ordering platform with interactive menu browsing, seamless cart experience, and fast checkout.',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Vercel'],
    liveUrl: 'https://jays-food-court.vercel.app',
    repoUrl: 'https://github.com/johnsonray1840-jpg',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-1',
    title: 'Crisis Sentinel',
    description: 'Real-time crisis reporting, geospatial incident tracking, and emergency telemetry platform.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Socket.IO', 'MongoDB', 'TailwindCSS'],
    liveUrl: 'https://crisis-sentinel.onrender.com',
    repoUrl: 'https://github.com/johnsonray1840-jpg',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-2',
    title: 'Quantnoon',
    description: 'High-frequency algorithmic trading analytics engine with real-time market data pipelines.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'WebSockets', 'Docker'],
    liveUrl: 'https://quantnoon.onrender.com',
    repoUrl: 'https://github.com/johnsonray1840-jpg',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-3',
    title: 'SchEase',
    description: 'Comprehensive multi-tenant school management SaaS system for academic administration.',
    techStack: ['Next.js', 'React', 'MongoDB', 'Express', 'TailwindCSS'],
    liveUrl: 'https://schease.onrender.com',
    repoUrl: 'https://github.com/johnsonray1840-jpg',
    deployedAt: new Date().toISOString(),
  },
  {
    _id: 'default-4',
    title: 'GoHunt',
    description: 'Next-generation digital asset and cryptocurrency exchange platform with real-time order books.',
    techStack: ['React', 'Node.js', 'MongoDB', 'REST API', 'TailwindCSS'],
    liveUrl: 'https://gohunt.onrender.com',
    repoUrl: 'https://github.com/johnsonray1840-jpg',
    deployedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }

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

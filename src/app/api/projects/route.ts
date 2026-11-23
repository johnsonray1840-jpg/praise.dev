import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '../../../../server/models/project';

export const DEFAULT_PROJECTS = [
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

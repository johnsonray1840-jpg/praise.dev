import { Router } from 'express';
import Project from '../models/project';

const router = Router();

router.get('/', async (_req, res) => {
  try {
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
    res.json(projects);
  } catch {
    res.json([]);
  }
});

export default router;

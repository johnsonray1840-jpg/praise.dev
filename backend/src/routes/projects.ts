import { Router } from 'express';
import Project from '../models/project';

const router = Router();

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

export default router;
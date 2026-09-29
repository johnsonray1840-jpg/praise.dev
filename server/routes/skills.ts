import { Router } from 'express';
import Skill from '../models/Skill';

const router = Router();

router.get('/', async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

export default router;
import { Router } from 'express';
import Visitor from '../models/Visitor';
import requestIp from 'request-ip';

const router = Router();

// Record a visitor (you can call this from the frontend)
router.post('/', async (req, res) => {
  const ip = requestIp.getClientIp(req);
  await Visitor.create({ ip, country: 'Unknown', city: 'Unknown' });
  res.json({ recorded: true });
});

// Get recent visitors (optional)
router.get('/recent', async (req, res) => {
  const visitors = await Visitor.find().sort({ timestamp: -1 }).limit(10);
  res.json(visitors);
});

export default router;
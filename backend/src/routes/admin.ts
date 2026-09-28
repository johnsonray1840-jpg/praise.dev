import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Project from '../models/project';
import Skill from '../models/Skill';
import Visitor from '../models/Visitor';
import Message from '../models/Message';
import { auth } from '../middleware/auth';

const router = Router();
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: JWT_SECRET environment variable is required in production.');
    }
    return 'dev-secret-key-change-in-production';
  }
  return secret;
};

const getAdminPassword = (): string => {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: ADMIN_PASSWORD environment variable is required in production.');
    }
    console.warn('⚠️ WARNING: Using default ADMIN_PASSWORD for development. Set ADMIN_PASSWORD in .env.');
    return 'admin123';
  }
  return password;
};

const JWT_SECRET = getJwtSecret();
const ADMIN_PASSWORD = getAdminPassword();

// ============================================
// AUTH
// ============================================

router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    return res.json({ 
      token, 
      expiresIn: '24h',
      message: 'Authentication successful' 
    });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// ============================================
// PROJECTS CRUD (Protected)
// ============================================

// Get all projects (public)
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create project (protected)
router.post('/projects', auth, async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, repoUrl, deployedAt, image } = req.body;
    
    // Validation
    if (!title || !description || !techStack || techStack.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const project = await Project.create({
      title,
      description,
      techStack,
      liveUrl,
      repoUrl,
      deployedAt: deployedAt || new Date(),
      image,
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (protected)
router.put('/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (protected)
router.delete('/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ============================================
// SKILLS CRUD (Protected)
// ============================================

// Get all skills (public)
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Create skill (protected)
router.post('/skills', auth, async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;
    
    if (!name || !category || proficiency === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (proficiency < 0 || proficiency > 100) {
      return res.status(400).json({ error: 'Proficiency must be between 0 and 100' });
    }

    const skill = await Skill.create({ name, category, proficiency });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// Update skill (protected)
router.put('/skills/:id', auth, async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;
    
    if (proficiency !== undefined && (proficiency < 0 || proficiency > 100)) {
      return res.status(400).json({ error: 'Proficiency must be between 0 and 100' });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id, 
      { name, category, proficiency }, 
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// Delete skill (protected)
router.delete('/skills/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// ============================================
// DASHBOARD STATS (Protected)
// ============================================

router.get('/stats', auth, async (req, res) => {
  try {
    const [projectsCount, skillsCount, visitorsCount, messagesCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Visitor.countDocuments(),
      Message.countDocuments(),
    ]);

    res.json({
      projects: projectsCount,
      skills: skillsCount,
      visitors: visitorsCount,
      messages: messagesCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ============================================
// MESSAGES (Protected)
// ============================================

router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

router.get('/sessions', auth, async (req, res) => {
  // ...
});

router.get('/sessions/:id', auth, async (req, res) => {
  // ...
});
export default router;
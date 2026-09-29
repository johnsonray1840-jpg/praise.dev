import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import next from 'next';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Server routes
import projectRoutes from './server/routes/projects';
import skillRoutes from './server/routes/skills';
import contactRoutes from './server/routes/contact';
import visitorRoutes from './server/routes/visitors';
import chatRoutes from './server/routes/chat';
import adminRoutes from './server/routes/admin';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '4000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  const httpServer = http.createServer(server);

  // CORS for external clients (if any)
  const allowedOrigins = process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000', 'http://127.0.0.1:4000'];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  };

  const io = new SocketServer(httpServer, { cors: corsOptions });

  server.use(cors(corsOptions));
  server.use(express.json());

  // MongoDB connection
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('⚠️ Warning: MONGODB_URI is not defined in environment variables.');
  } else {
    try {
      await mongoose.connect(mongoUri);
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
    }
  }

  // Socket.IO – visitor counter
  let activeVisitors = 0;
  io.on('connection', (socket) => {
    activeVisitors++;
    io.emit('visitor-count', activeVisitors);
    socket.on('disconnect', () => {
      activeVisitors = Math.max(0, activeVisitors - 1);
      io.emit('visitor-count', activeVisitors);
    });
  });

  // Health check endpoint
  server.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  // Express API Routes
  server.use('/api/projects', projectRoutes);
  server.use('/api/skills', skillRoutes);
  server.use('/api/contact', contactRoutes);
  server.use('/api/visitors', visitorRoutes);
  server.use('/api/chat', chatRoutes);
  server.use('/api/admin', adminRoutes);

  // Next.js handles all other routes (UI, pages, static assets, etc.)
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`🚀 QuantumFolio Unified Server ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start unified server:', err);
  process.exit(1);
});

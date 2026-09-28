import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects';
import skillRoutes from './routes/skills';
import contactRoutes from './routes/contact';
import visitorRoutes from './routes/visitors';
import chatRoutes from './routes/chat';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS Configuration
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback to permissive in dev if origin not explicitly blocked
    }
  },
  credentials: true,
};

const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ FATAL: MONGODB_URI is not defined in environment variables.');
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
}

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io – visitor counter
let activeVisitors = 0;
io.on('connection', (socket) => {
  activeVisitors++;
  io.emit('visitor-count', activeVisitors);
  socket.on('disconnect', () => {
    activeVisitors = Math.max(0, activeVisitors - 1);
    io.emit('visitor-count', activeVisitors);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
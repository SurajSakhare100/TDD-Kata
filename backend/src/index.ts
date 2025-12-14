import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import authRoutes from './routes/authRoutes';
import sweetRoutes from './routes/sweetRoutes';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database schema
async function initializeDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'config', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    await pool.query(schema);
    console.log('✅ Database schema initialized');
  } catch (error: any) {
    if (error.code !== '42P07') { // Table already exists
      console.error('❌ Error initializing database:', error.message);
    }
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sweet Shop API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

startServer();

export default app;


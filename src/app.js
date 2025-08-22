import express from 'express';
import rateLimit from 'express-rate-limit';
import uploadRoutes from './routes/upload.js';
import { logger } from './utils/logger.js';

const app = express();

// Rate limiting
const uploadLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: 'Too many upload attempts, please try again later.' },
});

// Routes
app.use('/upload', uploadLimiter, uploadRoutes);

// Error handler
app.use((err, req, res, next) => {
  logger.error(`Unexpected error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

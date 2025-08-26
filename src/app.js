import express from 'express';
import rateLimit from 'express-rate-limit';
import uploadRoutes from './routes/upload.js';
import { logger } from './utils/logger.js';

const app = express();

const RATE_LIMIT_WINDOW_MS = 1 * 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MESSAGE = {
  error: 'Too many upload attempts, please try again later.',
};

const uploadLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: RATE_LIMIT_MESSAGE,
});

app.use('/upload', uploadLimiter, uploadRoutes);

app.use((err, req, res, next) => {
  logger.error(`Unexpected error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

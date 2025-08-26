// Upload + status routes
import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { mockValidateEmail } from '../services/validator.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import pLimit from 'p-limit';

const router = express.Router();
const uploadPath = path.join(process.cwd(), 'uploads');
const upload = multer({ dest: uploadPath });

const statusMap = new Map();

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadId = uuidv4();
  statusMap.set(uploadId, { progress: '0%' });

  res.json({
    uploadId,
    message: 'File uploaded successfully. Processing started.',
  });

  const filePath = req.file.path;
  const results = [];
  const failed = [];
  let totalRecords = 0;

  const limit = pLimit(5);

  try {
    const tasks = [];
    const stream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of stream) {
      totalRecords++;
      const { name, email } = row;
      tasks.push(
        limit(async () => {
          try {
            const validation = await mockValidateEmail(email);
            logger.info(`Validating ${email}: ${validation.valid}`);

            if (validation.valid) {
              results.push({ name, email, status: 'success' });
            } else {
              failed.push({ name, email, error: 'Invalid email format' });
            }
          } catch (err) {
            failed.push({ name, email, error: 'Validation service error' });
            logger.error(`Error validating ${email}: ${err.message}`);
          }
          const progress = Math.round(
            ((results.length + failed.length) / totalRecords) * 100
          );
          statusMap.set(uploadId, { progress: `${progress}%` });
        })
      );
    }

    await Promise.all(tasks);

    statusMap.set(uploadId, {
      totalRecords,
      processedRecords: results.length,
      failedRecords: failed.length,
      details: failed,
    });
  } catch (error) {
    logger.error(`Processing error: ${error.message}`);
    statusMap.set(uploadId, {
      error: 'Server error occurred during processing',
    });
  }
});

router.get('/:uploadId', (req, res) => {
  const { uploadId } = req.params;
  if (!statusMap.has(uploadId)) {
    return res.status(404).json({ error: 'Upload ID not found' });
  }
  res.json({ uploadId, ...statusMap.get(uploadId) });
});

export default router;

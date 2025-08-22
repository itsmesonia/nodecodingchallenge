import request from 'supertest';
import app from '../src/app.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('File Upload API', () => {
  it('should return 400 if no file uploaded', async () => {
    const res = await request(app).post('/upload');
    expect(res.statusCode).toBe(400);
  });

  it('should process a valid csv file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, '../src/sample.csv'));

    expect(res.statusCode).toBe(200);
    expect(res.body.uploadId).toBeDefined();
  });

  it('should return 404 for unknown uploadId', async () => {
    const res = await request(app).get('/upload/nonexistent-id');
    expect(res.statusCode).toBe(404);
  });
});

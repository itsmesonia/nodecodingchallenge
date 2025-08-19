import request from 'supertest';
import app from '../src/app.js';
import path from 'path';

describe('File Upload API', () => {
  it('should return 400 if no file uploaded', async () => {
    const res = await request(app).post('/upload');
    expect(res.statusCode).toBe(400);
  });

  it('should process a valid csv file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, 'sample.csv'));

    expect(res.statusCode).toBe(200);
    expect(res.body.uploadId).toBeDefined();
  });
});

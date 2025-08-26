import path from 'path';
import { fileURLToPath } from 'url';
import { parseCSV } from '../src/utils/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CSV Parser Utility', () => {
  it('should parse rows from a CSV file', async () => {
    const filePath = path.join(__dirname, '../src/sample.csv');
    const rows = [];
    await parseCSV(filePath, (row) => rows.push(row));

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]).toHaveProperty('name');
    expect(rows[0]).toHaveProperty('email');
  });
});

import fs from 'fs';
import csv from 'csv-parser';

export const parseCSV = async (filePath, rowHandler) => {
  const stream = fs.createReadStream(filePath).pipe(csv());
  for await (const row of stream) {
    await rowHandler(row);
  }
};

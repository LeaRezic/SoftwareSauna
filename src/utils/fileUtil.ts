import fs from 'fs';
import path from 'path';

import { isNullOrEmpty } from './stringUtil';

const readASCIIFile = (path: string): string => {
  try {
    return fs.readFileSync(path, 'ascii');
  } catch (error) {
    throw new Error(`Failed to read file on path: ${path}. ${error}`);
  }
};

export const readFileFromData = (fileName: string): string => {
  if (isNullOrEmpty(fileName)) {
    throw new Error('Invalid file name. Must be a non-empty string.');
  }
  const filePath = path.join(__dirname, '..', '..', 'data', fileName);
  return readASCIIFile(filePath);
};

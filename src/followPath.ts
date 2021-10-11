import os from 'os';

import {
  END_VALUE,
  START_VALUE,
} from './constants';
import {
  FollowPathResult,
  PathGrid,
} from './interfaces';
import { readFileFromData } from './utils/fileUtil';
import { traverseGrid } from './domain/traversal';
import { validateCharFrequency } from './utils/validationUtil';

export const followPath = (fileName: string): FollowPathResult => {
  const rawGrid = readFileFromData(fileName);
  validateCharFrequency(rawGrid, START_VALUE, 1);
  validateCharFrequency(rawGrid, END_VALUE, 1);
  const pathGrid: PathGrid = rawGrid.split(os.EOL);
  return traverseGrid(pathGrid);
};

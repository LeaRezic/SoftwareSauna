import { getCharFrequency } from './stringUtil';

export const validateCharFrequency = (str: string, char: string, frequency: number): void => {
  const charCount = getCharFrequency(str, char);
  if (charCount !== frequency) {
    throw new Error(`There should be exactly ${frequency} ${char} characters. Found: ${charCount}.`);
  }
};

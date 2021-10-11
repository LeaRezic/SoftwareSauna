export const getCharFrequency = (str: string, char: string): number => {
  if (isNullOrEmpty(char) || char.length !== 1) {
    throw new Error('Invalid char provided, must be 1 string character.');
  }
  return str.split('').reduce((count, curr) => {
    if (curr === char) {
      count++;
    }
    return count;
  }, 0);
};

export const isASCIILetter = (char: string): boolean => {
  if (isNullOrEmpty(char) || char.length !== 1) {
    return false;
  }
  const code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

export const isNullOrEmpty = (value: string): boolean => value == null || typeof value !== 'string' || value.trim().length === 0;

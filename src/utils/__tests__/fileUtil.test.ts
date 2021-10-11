import { readFileFromData } from '../fileUtil';

describe('Read file from data', () => {

  it('Should throw for an invalid file name', () => {
    expect(() => readFileFromData('nope')).toThrow();
    expect(() => readFileFromData('')).toThrow();
    expect(() => readFileFromData(true as unknown as string)).toThrow();
  });

  it('Should not throw for a valid file name', () => {
    expect(() => readFileFromData('example_01.txt')).not.toThrow();
    expect(() => readFileFromData('test.txt')).not.toThrow();
  });

  it('Should read the file content correctly', () => {
    expect(readFileFromData('test.txt')).toBe('test');
  });
});

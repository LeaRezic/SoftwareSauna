import { validateCharFrequency } from '../validationUtil';

describe('Validate Char frequency', () => {

  it('Should not throw if char frequency is correct', () => {
    expect(() => validateCharFrequency('test', 't', 2)).not.toThrow();
    expect(() => validateCharFrequency('test', '@', 0)).not.toThrow();
  });

  it('Should throw if char frequency is not correct', () => {
    expect(() => validateCharFrequency('test', 't', 1)).toThrow();
    expect(() => validateCharFrequency('test', '@', 1)).toThrow();
  });

  it('Should throw if passed in search string is not a string', () => {
    expect(() => validateCharFrequency(123 as unknown as string, '1', 0)).toThrow();
    expect(() => validateCharFrequency(true as unknown as string, 't', 0)).toThrow();
    expect(() => validateCharFrequency(['a'] as unknown as string, 't', 0)).toThrow();
    expect(() => validateCharFrequency({ a: 'a' } as unknown as string, 't', 0)).toThrow();
  });

  it('Should throw if passed in target char is not a single string character', () => {
    expect(() => validateCharFrequency('test', 'te', 1)).toThrow();
    expect(() => validateCharFrequency('test', '@@', 0)).toThrow();
  });

});

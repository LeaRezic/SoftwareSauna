import {
  getCharFrequency,
  isASCIILetter,
  isNullOrEmpty,
} from '../stringUtil';

describe('Is ASCII letter', () => {

  it('Should return true for ASCII letters', () => {
    expect(isASCIILetter('A')).toBe(true);
    expect(isASCIILetter('a')).toBe(true);
    expect(isASCIILetter('L')).toBe(true);
    expect(isASCIILetter('l')).toBe(true);
    expect(isASCIILetter('Z')).toBe(true);
    expect(isASCIILetter('z')).toBe(true);
  });

  it('Should return false for extended ASCII letters', () => {
    expect(isASCIILetter('Š')).toBe(false);
    expect(isASCIILetter('Å')).toBe(false);
    expect(isASCIILetter('Ñ')).toBe(false);
    expect(isASCIILetter('ß')).toBe(false);
  });

  it('Should return false for non ASCII letters', () => {
    expect(isASCIILetter('தி')).toBe(false);
    expect(isASCIILetter('ק')).toBe(false);
    expect(isASCIILetter('络')).toBe(false);
    expect(isASCIILetter('त')).toBe(false);
  });

  it('Should return false for ASCII non letter strings', () => {
    expect(isASCIILetter('@')).toBe(false);
    expect(isASCIILetter('[')).toBe(false);
    expect(isASCIILetter('_')).toBe(false);
    expect(isASCIILetter('`')).toBe(false);
    expect(isASCIILetter('{')).toBe(false);
    expect(isASCIILetter('|')).toBe(false);
  });

  it('Should return false for non string values', () => {
    expect(isASCIILetter(null as unknown as string)).toBe(false);
    expect(isASCIILetter(1 as unknown as string)).toBe(false);
    expect(isASCIILetter(true as unknown as string)).toBe(false);
    expect(isASCIILetter(undefined as unknown as string)).toBe(false);
  });

  it('Should return false for string longer than 1 character', () => {
    expect(isASCIILetter('Nope')).toBe(false);
    expect(isASCIILetter('A1')).toBe(false);
  });
});

describe('Char frequency', () => {

  it('Should give correct number of char frequency', () => {
    expect(getCharFrequency('test', 't')).toBe(2);
    expect(getCharFrequency('test', '@')).toBe(0);
  });

  it('Should not give incorrect number of char frequency', () => {
    expect(getCharFrequency('test', 't')).not.toBe(1);
    expect(getCharFrequency('test', '@')).not.toBe(1);
  });

  it('Should not give incorrect number of char frequency', () => {
    expect(getCharFrequency('test', 't')).not.toBe(1);
    expect(getCharFrequency('test', '@')).not.toBe(1);
  });

  it('Should throw if passed in search string is not a string', () => {
    expect(() => getCharFrequency(123 as unknown as string, '1')).toThrow();
    expect(() => getCharFrequency(true as unknown as string, 't')).toThrow();
  });

  it('Should throw if passed in target char is not a single string character', () => {
    expect(() => getCharFrequency('test', 'te')).toThrow();
    expect(() => getCharFrequency('test', '@@')).toThrow();
  });

});

describe('Is null or empty', () => {

  it('Should return true if value is null or undefined', () => {
    expect(isNullOrEmpty(null as unknown as string)).toBe(true);
    expect(isNullOrEmpty(undefined as unknown as string)).toBe(true);
  });

  it('Should return true if value is not a string', () => {
    expect(isNullOrEmpty(123 as unknown as string)).toBe(true);
    expect(isNullOrEmpty(false as unknown as string)).toBe(true);
    expect(isNullOrEmpty(['a', 'b'] as unknown as string)).toBe(true);
    expect(isNullOrEmpty({} as unknown as string)).toBe(true);
  });

  it('Should return true if value is an empty string', () => {
    expect(isNullOrEmpty('')).toBe(true);
    expect(isNullOrEmpty('    ')).toBe(true);
    expect(isNullOrEmpty('\n')).toBe(true);
  });

  it('Should return false if value is a non-empty string', () => {
    expect(isNullOrEmpty('test')).toBe(false);
    expect(isNullOrEmpty(' 1 ')).toBe(false);
    expect(isNullOrEmpty('bla bla bla')).toBe(false);
  });
});

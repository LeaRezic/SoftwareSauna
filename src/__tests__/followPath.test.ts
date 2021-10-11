import { followPath } from '../followPath';

describe('Acceptance tests - Should pass valid maps with correct results', () => {

  it('Map 01 - a basic example', () => {
    const result = followPath('example_01.txt');
    expect(result.collectedLetters).toBe('ACB');
    expect(result.pathAsCharacters).toBe('@---A---+|C|+---+|+-B-x');
  });

  it('Map 02 - go straight through intersections', () => {
    const result = followPath('example_02.txt');
    expect(result.collectedLetters).toBe('ABCD');
    expect(result.pathAsCharacters).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
  });

  it('Map 03 - letters may be found on turns', () => {
    const result = followPath('example_03.txt');
    expect(result.collectedLetters).toBe('ACB');
    expect(result.pathAsCharacters).toBe('@---A---+|||C---+|+-B-x');
  });

  it('Map 04 - do not collect a letter from the same location twice', () => {
    const result = followPath('example_04.txt');
    expect(result.collectedLetters).toBe('GOONIES');
    expect(result.pathAsCharacters).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
  });

  it('Map 05 - keep direction, even in a compact space', () => {
    const result = followPath('example_05.txt');
    expect(result.collectedLetters).toBe('BLAH');
    expect(result.pathAsCharacters).toBe('@B+++B|+-L-+A+++A-+Hx');
  });
});

describe('Acceptance tests - Should throw on invalid maps', () => {

  it('Map 06 - no start', () => {
    expect(() => followPath('example_06.txt')).toThrow();
  });

  it('Map 07 - no end', () => {
    expect(() => followPath('example_07.txt')).toThrow();
  });

  it('Map 08 - multiple starts', () => {
    expect(() => followPath('example_08.txt')).toThrow();
  });

  it('Map 09 - multiple ends', () => {
    expect(() => followPath('example_09.txt')).toThrow();
  });

  it('Map 10 - T forks', () => {
    expect(() => followPath('example_10.txt')).toThrow();
  });

  it('Map 11 - broken path', () => {
    expect(() => followPath('example_11.txt')).toThrow();
  });

  it('Map 12 - multiple starting paths', () => {
    expect(() => followPath('example_12.txt')).toThrow();
  });

  it('Map 13 - fake turn', () => {
    expect(() => followPath('example_13.txt')).toThrow();
  });
});

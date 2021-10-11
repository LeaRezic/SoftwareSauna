import { traverseGrid } from '../traversal';

describe('Traverse valid grids', () => {

  it('Should collect valid results for a valid simple grid', () => {
    const simpleGrid = [
      '@--A-x',
    ];
    const result = traverseGrid(simpleGrid);
    expect(result.collectedLetters).toBe('A');
    expect(result.pathAsCharacters).toBe('@--A-x');
  });

  it('Should collect valid results for a valid grid, with some compact lines', () => {
    const compactGrid = [
      '@--A-+',
      ' B---+',
      ' |',
      ' x',
    ];
    const result = traverseGrid(compactGrid);
    expect(result.collectedLetters).toBe('AB');
    expect(result.pathAsCharacters).toBe('@--A-++---B|x');
  });

  it('Should collect valid results for a valid grid, which has a letter as a turn', () => {
    const gridWithLetterOnTurns = [
      '@--A-+',
      '     |',
      '  x--B',
    ];
    const result = traverseGrid(gridWithLetterOnTurns);
    expect(result.collectedLetters).toBe('AB');
    expect(result.pathAsCharacters).toBe('@--A-+|B--x');
  });

  it('Should collect valid results for a valid grid, which has a single line intersection', () => {
    const gridWithSingleIntersection = [
      ' B---x',
      ' |',
      '@--A-+',
      ' |   |',
      ' C---+',
    ];
    const result = traverseGrid(gridWithSingleIntersection);
    expect(result.collectedLetters).toBe('ACB');
    expect(result.pathAsCharacters).toBe('@--A-+|+---C|-|B---x');
  });

  it('Should collect valid results for a valid grid, which has a multiple lines intersection', () => {
    const gridWithMultipleIntersections = [
      '       x',
      '       |',
      '  @---------+',
      '     +------Y',
      '     +-U--+',
      '       |  |',
      '       |  |',
      '       +--P',
    ];
    const result = traverseGrid(gridWithMultipleIntersections);
    expect(result.collectedLetters).toBe('YUP');
    expect(result.pathAsCharacters).toBe('@---------+Y------++-U--+||P--+||U--|x');
  });

  it('Should not collect same letters twice', () => {
    const gridWithIntersectionLetters = [
      '       x',
      '       |',
      '  @----M----+',
      '     +-H----Y',
      '     +-U--+',
      '       |  |',
      '       |  |',
      '       +--P',
    ];
    const result = traverseGrid(gridWithIntersectionLetters);
    expect(result.collectedLetters).not.toBe('MYHUPUHM');
  });
});

describe('Traverse invalid grids', () => {

  it('Should throw for grid with multiple start paths', () => {
    const gridWithMultipleStartPaths = [
      '  @---x',
      '  |',
    ];
    expect(() => traverseGrid(gridWithMultipleStartPaths)).toThrow();
  });

  it('Should throw for grid with a T section', () => {
    const gridWithTSection = [
      '  |',
      '  +---@',
      '  |',
    ];
    expect(() => traverseGrid(gridWithTSection)).toThrow();
  });

  it('Should throw for grid a fake turn', () => {
    const gridWithFakeTurn = [
      ' -+---@',
    ];
    expect(() => traverseGrid(gridWithFakeTurn)).toThrow();
  });

  it('Should throw for grid with broken path', () => {
    const gridWithBrokenPath = [
      'x ---@',
    ];
    expect(() => traverseGrid(gridWithBrokenPath)).toThrow();
  });

});

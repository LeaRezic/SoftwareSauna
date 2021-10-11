import {
  Direction,
  Node,
  PathGrid,
  VisitedGrid,
} from '../../interfaces';
import {
  areCoordinatesWithinGrid,
  createEmptyVisitedGrid,
  findFirstNodeWithElement,
  getNeighbourNodeCoordinates,
  hasNodeBeenVisited,
} from '../grid';

const getSampleGrid = (): PathGrid => [
  '@--A-+',
  ' B---+',
  ' |',
  ' x',
];

const getSampleVisitedGrid = (): VisitedGrid => [
  [true, true, true, true, true, true],
  [false, false, true, true, true, true],
  [false, false],
  [false, false],
  [false, false],
];

describe('Are coordinates within grid', () => {

  it('Should return true if coordinates are withing grid', () => {
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 0, column: 5 })).toBe(true);
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 1, column: 3 })).toBe(true);
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 3, column: 1 })).toBe(true);
  });

  it('Should return false if coordinates are not withing grid', () => {
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 0, column: 6 })).toBe(false);
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 1, column: -1 })).toBe(false);
    expect(areCoordinatesWithinGrid(getSampleGrid(), { row: 4, column: 0 })).toBe(false);
  });
});

describe('Get neighbour node coordinates', () => {

  const nodeWithin: Node = { coordinates: { row: 1, column: 3 }, value: '-' };

  it('Should return correct neighbour node coordinates for direction', () => {
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Up)).toEqual({ row: 0, column: 3 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Right)).toEqual({ row: 1, column: 4 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Down)).toEqual({ row: 2, column: 3 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Left)).toEqual({ row: 1, column: 2 });
  });

  it('Should not return incorrect neighbour node coordinates for direction', () => {
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Up)).not.toEqual({ row: 2, column: 3 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Up)).not.toEqual({ row: 3, column: 0 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Right)).not.toEqual({ row: 1, column: 2 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Right)).not.toEqual({ row: 4, column: 1 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Down)).not.toEqual({ row: 0, column: 3 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Down)).not.toEqual({ row: 3, column: 2 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Left)).not.toEqual({ row: 1, column: 4 });
    expect(getNeighbourNodeCoordinates(nodeWithin, Direction.Left)).not.toEqual({ row: 2, column: 1 });
  });
});

describe('Has node been visited', () => {

  it('Should return true for visited nodes', () => {
    const visitedNode1 = { coordinates: { row: 0, column: 0 }, value: '@' };
    const visitedNode2 = { coordinates: { row: 0, column: 3 }, value: 'A' };
    const visitedNode3 = { coordinates: { row: 1, column: 2 }, value: '-' };
    expect(hasNodeBeenVisited(getSampleVisitedGrid(), visitedNode1)).toEqual(true);
    expect(hasNodeBeenVisited(getSampleVisitedGrid(), visitedNode2)).toEqual(true);
    expect(hasNodeBeenVisited(getSampleVisitedGrid(), visitedNode3)).toEqual(true);
  });

  it('Should return false for unvisited nodes', () => {
    const unvisitedNode1: Node = { coordinates: { row: 1, column: 1 }, value: 'B' };
    const unvisitedNode2: Node = { coordinates: { row: 3, column: 1 }, value: 'B' };
    expect(hasNodeBeenVisited(getSampleVisitedGrid(), unvisitedNode1)).toEqual(false);
    expect(hasNodeBeenVisited(getSampleVisitedGrid(), unvisitedNode2)).toEqual(false);
  });
});

describe('Find first node with value', () => {

  it('Should return node whose value is present in the grid, with correct coordinates', () => {
    expect(findFirstNodeWithElement(getSampleGrid(), '@')).toEqual({ value: '@', coordinates: { row: 0, column: 0 }});
    expect(findFirstNodeWithElement(getSampleGrid(), '-')).toEqual({ value: '-', coordinates: { row: 0, column: 1 }});
    expect(findFirstNodeWithElement(getSampleGrid(), 'x')).toEqual({ value: 'x', coordinates: { row: 3, column: 1 }});
  });

  it('Should not return incorrect coordinates of node whose value is present in the grid', () => {
    expect(findFirstNodeWithElement(getSampleGrid(), '@')).not.toEqual({ value: '@', coordinates: { row: 1, column: 0 }});
    expect(findFirstNodeWithElement(getSampleGrid(), '-')).not.toEqual({ value: '-', coordinates: { row: 0, column: 2 }});
    expect(findFirstNodeWithElement(getSampleGrid(), 'x')).not.toEqual({ value: 'x', coordinates: { row: 3, column: 0 }});
  });

  it('Should return undefined for values which are not present in the grid', () => {
    expect(findFirstNodeWithElement(getSampleGrid(), 'C')).toBe(undefined);
    expect(findFirstNodeWithElement(getSampleGrid(), 'D')).toBe(undefined);
  });
});

describe('Create empty visited grid', () => {

  it('Visited grid should be same size as input grid', () => {
    const grid = getSampleGrid();
    const newVistedGrid = createEmptyVisitedGrid(grid);
    expect(newVistedGrid.length).toBe(grid.length);
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const row = grid[rowIndex];
      expect(newVistedGrid[rowIndex].length).toBe(row.length);
    }
  });

  it('Visited grid should be filled with false only', () => {
    const grid = getSampleGrid();
    const newVistedGrid = createEmptyVisitedGrid(grid);
    const anyTruthValue = newVistedGrid.some((row) => row.some((value) => value));
    expect(anyTruthValue).toBe(false);
  });
});

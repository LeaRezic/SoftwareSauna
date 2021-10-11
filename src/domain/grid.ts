import {
  Coordinates,
  Direction,
  Node,
  PathElement,
  PathGrid,
  VisitedGrid,
} from '../interfaces';
import { getCoordinatesForDirection } from './direction';

const findCoordinatesOfElement = (pathGrid: PathGrid, el: PathElement): Coordinates | undefined => {
  for (let row = 0; row < pathGrid.length; row++) {
    const column = pathGrid[row].indexOf(el);
    if (column !== -1) {
      return { row, column };
    }
  }
};

export const areCoordinatesWithinGrid = (pathGrid: PathGrid, coordinates: Coordinates): boolean => {
  return !(coordinates.row < 0
    || coordinates.row >= pathGrid.length
    || coordinates.column < 0
    || coordinates.column >= pathGrid[coordinates.row].length);
};

export const getNeighbourNodeCoordinates = (node: Node, direction: Direction): Coordinates => ({
  row: node.coordinates.row + getCoordinatesForDirection(direction).row,
  column: node.coordinates.column + getCoordinatesForDirection(direction).column,
});

export const hasNodeBeenVisited = (visitedGrid: VisitedGrid, node: Node): boolean =>
  visitedGrid[node.coordinates.row][node.coordinates.column];

export const findFirstNodeWithElement = (pathGrid: PathGrid, value: PathElement): Node | undefined => {
  const coordinates = findCoordinatesOfElement(pathGrid, value);
  if (coordinates != null) {
    return { coordinates, value };
  }
};

export const createEmptyVisitedGrid = (pathGrid: PathGrid): VisitedGrid => {
  return pathGrid.map((row) => row.split('').map(() => false));
};

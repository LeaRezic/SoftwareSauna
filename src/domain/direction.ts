import {
  Coordinates,
  Direction,
} from '../interfaces';

export const getCoordinatesForDirection = (direction: Direction): Coordinates => {
  switch (direction) {
    case Direction.Up:
      return { row: -1, column: 0 };
    case Direction.Right:
      return { row: 0, column: 1 };
    case Direction.Down:
      return { row: 1, column: 0 };
    case Direction.Left:
      return { row: 0, column: -1 };
    default:
      throw new Error(`Invalid direction: ${direction}.`);
  }
};

export const getAllowedDirectionsOnTurn = (direction: Direction): Direction[] => {
  switch (direction) {
    case Direction.Up:
    case Direction.Down:
      return [Direction.Right, Direction.Left];
    case Direction.Right:
    case Direction.Left:
      return [Direction.Up, Direction.Down];
    default:
      throw new Error(`Invalid direction: ${direction}.`);
  }
};

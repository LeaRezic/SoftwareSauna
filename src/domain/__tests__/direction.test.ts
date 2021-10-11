import {
  getAllowedDirectionsOnTurn,
  getCoordinatesForDirection,
} from '../direction';
import { Direction } from '../../interfaces';

describe('Get coordinates for direction', () => {

  it('Should give correct coordinates for moving in a direction', () => {
    expect(getCoordinatesForDirection(Direction.Up)).toEqual({ row: -1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Right)).toEqual({ row: 0, column: 1 });
    expect(getCoordinatesForDirection(Direction.Down)).toEqual({ row: 1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Left)).toEqual({ row: 0, column: -1 });
  });

  it('Should not give incorrect coordinates for moving in a direction', () => {
    expect(getCoordinatesForDirection(Direction.Up)).not.toEqual({ row: 0, column: -1 });
    expect(getCoordinatesForDirection(Direction.Up)).not.toEqual({ row: 1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Right)).not.toEqual({ row: 1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Right)).not.toEqual({ row: 0, column: -1 });
    expect(getCoordinatesForDirection(Direction.Down)).not.toEqual({ row: 0, column: 1 });
    expect(getCoordinatesForDirection(Direction.Down)).not.toEqual({ row: -1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Left)).not.toEqual({ row: -1, column: 0 });
    expect(getCoordinatesForDirection(Direction.Left)).not.toEqual({ row: 0, column: 1 });
  });

  it('Should throw if receiving invalid direction value', () => {
    expect(() => getCoordinatesForDirection('Wrong' as Direction)).toThrow('Invalid direction: Wrong');
    expect(() => getCoordinatesForDirection('Uup' as Direction)).toThrow('Invalid direction: Uup');
    expect(() => getCoordinatesForDirection('UpRight' as Direction)).toThrow('Invalid direction: UpRight');
  });
});

describe('Get allowed directions on turn', () => {

  it('Should give correct allowed directions on turn', () => {
    expect(getAllowedDirectionsOnTurn(Direction.Up)).toEqual([Direction.Right, Direction.Left]);
    expect(getAllowedDirectionsOnTurn(Direction.Right)).toEqual([Direction.Up, Direction.Down]);
    expect(getAllowedDirectionsOnTurn(Direction.Down)).toEqual([Direction.Right, Direction.Left]);
    expect(getAllowedDirectionsOnTurn(Direction.Left)).toEqual([Direction.Up, Direction.Down]);
  });

  it('Should not give incorrect directions on turn', () => {
    expect(getAllowedDirectionsOnTurn(Direction.Up)).not.toEqual([Direction.Right, Direction.Down]);
    expect(getAllowedDirectionsOnTurn(Direction.Up)).not.toEqual([Direction.Up, Direction.Left]);
    expect(getAllowedDirectionsOnTurn(Direction.Right)).not.toEqual([Direction.Left, Direction.Down]);
    expect(getAllowedDirectionsOnTurn(Direction.Right)).not.toEqual([Direction.Right, Direction.Down]);
    expect(getAllowedDirectionsOnTurn(Direction.Down)).not.toEqual([Direction.Up, Direction.Left]);
    expect(getAllowedDirectionsOnTurn(Direction.Down)).not.toEqual([Direction.Down, Direction.Left]);
    expect(getAllowedDirectionsOnTurn(Direction.Left)).not.toEqual([Direction.Left, Direction.Down]);
    expect(getAllowedDirectionsOnTurn(Direction.Left)).not.toEqual([Direction.Right, Direction.Down]);
  });

  it('Should throw if receiving invalid direction value', () => {
    expect(() => getAllowedDirectionsOnTurn('Wrong' as Direction)).toThrow('Invalid direction: Wrong');
    expect(() => getAllowedDirectionsOnTurn('Uup' as Direction)).toThrow('Invalid direction: Uup');
    expect(() => getAllowedDirectionsOnTurn('UpRight' as Direction)).toThrow('Invalid direction: UpRight');
  });
});

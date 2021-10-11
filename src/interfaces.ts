export type PathElement = string;

export type PathGrid = PathElement[];

export type VisitedGrid = boolean[][];

export enum Direction {
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Left = 'Left',
}

export interface Coordinates {
  row: number,
  column: number
}

export interface Node {
  coordinates: Coordinates,
  value: PathElement,
}

export interface FollowPathResult {
  pathAsCharacters: string
  collectedLetters: string
}

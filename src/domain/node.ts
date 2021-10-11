import {
  Direction,
  Node,
} from '../interfaces';
import {
  END_VALUE,
  HORIZONTAL_VALUE,
  START_VALUE,
  TURN_VALUE,
  VERTICAL_VALUE,
} from '../constants';
import { isASCIILetter } from '../utils/stringUtil';

export const isEndNode = (node: Node): boolean => node.value === END_VALUE;

export const isLetterNode = (node: Node): boolean => isASCIILetter(node.value);

const isVerticalPathNode = (node: Node): boolean => node.value === VERTICAL_VALUE;

const isHorizontalPathNode = (node: Node): boolean => node.value === HORIZONTAL_VALUE;

export const isTurnNode = (node: Node): boolean => node.value === TURN_VALUE;

export const isStartNode = (node: Node): boolean => node.value === START_VALUE;

export const isBasicPathNode = (node: Node): boolean => isVerticalPathNode(node) || isHorizontalPathNode(node);

const isAllowedNodeForDirection = (node: Node, direction: Direction): boolean => {
  switch (direction) {
    case Direction.Up:
    case Direction.Down:
      return isVerticalPathNode(node);
    case Direction.Right:
    case Direction.Left:
      return isHorizontalPathNode(node);
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }
};

export const canPathGoToNode = (node: Node, direction: Direction): boolean =>
  isEndNode(node)
  || isLetterNode(node)
  || isTurnNode(node)
  || isAllowedNodeForDirection(node, direction);

export const createNodeErrorMsg = (node: Node, details: string): string => {
  return `Invalid ${node.value} node at [${node.coordinates.row}][${node.coordinates.column}]\n${details}`;
};

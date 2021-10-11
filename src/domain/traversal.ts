import {
  ALL_DIRECTIONS,
  START_VALUE,
} from '../constants';
import {
  Coordinates,
  Direction,
  FollowPathResult,
  Node,
  PathGrid,
  VisitedGrid,
} from '../interfaces';
import {
  areCoordinatesWithinGrid,
  createEmptyVisitedGrid,
  findFirstNodeWithElement,
  getNeighbourNodeCoordinates,
  hasNodeBeenVisited,
} from './grid';
import {
  canPathGoToNode,
  createNodeErrorMsg,
  isBasicPathNode,
  isEndNode,
  isLetterNode,
  isStartNode,
  isTurnNode,
} from './node';
import { getAllowedDirectionsOnTurn } from './direction';

const getNextNodeInDirection = (pathGrid: PathGrid, node: Node, direction: Direction): Node | undefined => {
  const neighbourCoordinates: Coordinates = getNeighbourNodeCoordinates(node, direction);
  if (areCoordinatesWithinGrid(pathGrid, neighbourCoordinates)) {
    return {
      coordinates: neighbourCoordinates,
      value: pathGrid[neighbourCoordinates.row][neighbourCoordinates.column],
    };
  }
};

const canPathMoveInDirection = (
  pathGrid: PathGrid,
  node: Node,
  direction: Direction,
  visitedGrid: VisitedGrid,
): boolean => {
  const nextNode = getNextNodeInDirection(pathGrid, node, direction);
  if (nextNode == null) {
    return false;
  } else {
    if (hasNodeBeenVisited(visitedGrid, nextNode)) {
      return canPathMoveInDirection(pathGrid, nextNode, direction, visitedGrid);
    }
    return canPathGoToNode(nextNode, direction);
  }
};

const getNextMoveForMultipleDirections = (
  pathGrid: PathGrid,
  node: Node,
  visitedGrid: VisitedGrid,
  allowedDirections: Direction[],
): Direction => {
  const possibleMoves = allowedDirections.filter((dir) => canPathMoveInDirection(pathGrid, node, dir, visitedGrid));
  if (possibleMoves.length === 1) {
    return possibleMoves[0];
  } else {
    const errorDetails = possibleMoves.length > 1 ? 'There are several possible moves.' : 'There are no possible allowed moves.';
    throw new Error(createNodeErrorMsg(node, errorDetails));
  }
};

const getNextMoveForSingleDirection = (
  pathGrid: PathGrid,
  node: Node,
  visitedGrid: VisitedGrid,
  direction: Direction,
): Direction => {
  if (canPathMoveInDirection(pathGrid, node, direction, visitedGrid)) {
    return direction;
  } else {
    const errorDetails = `Should continue in direction ${direction}, but it is not possible.`;
    throw new Error(createNodeErrorMsg(node, errorDetails));
  }
};

const getNextValidMoveDirection = (pathGrid: PathGrid, visitedGrid: VisitedGrid, node: Node, direction: Direction): Direction => {
  if (isStartNode(node)) {
    return getNextMoveForMultipleDirections(pathGrid, node, visitedGrid, ALL_DIRECTIONS);
  }
  if (hasNodeBeenVisited(visitedGrid, node) || isBasicPathNode(node)) {
    return getNextMoveForSingleDirection(pathGrid, node, visitedGrid, direction);
  }
  if (isTurnNode(node)) {
    return getNextMoveForMultipleDirections(pathGrid, node, visitedGrid, getAllowedDirectionsOnTurn(direction));
  }
  if (isLetterNode(node)) {
    try {
      return getNextMoveForSingleDirection(pathGrid, node, visitedGrid, direction);
    } catch (error) {
      return getNextMoveForMultipleDirections(pathGrid, node, visitedGrid, getAllowedDirectionsOnTurn(direction));
    }
  }
  throw new Error(createNodeErrorMsg(node, 'Unknown node value, cannot determine next move.'));
};

const traverseNode = (
  pathGrid: PathGrid,
  visitedGrid: VisitedGrid,
  node: Node,
  direction: Direction,
  pathAsCharacters: string,
  collectedLetters: string,
): FollowPathResult => {
  pathAsCharacters += node.value;
  if (isEndNode(node)) {
    return { collectedLetters, pathAsCharacters };
  }
  if (isLetterNode(node) && !hasNodeBeenVisited(visitedGrid, node)) {
    collectedLetters += node.value;
  }
  const nextValidMoveDirection = getNextValidMoveDirection(pathGrid, visitedGrid, node, direction);
  const nextNode = getNextNodeInDirection(pathGrid, node, nextValidMoveDirection);
  if (nextNode == null) {
    throw new Error(createNodeErrorMsg(node, `Should go in direction: ${direction}, but it is not possible.`));
  } else {
    visitedGrid[node.coordinates.row][node.coordinates.column] = true;
    return traverseNode(pathGrid, visitedGrid, nextNode, nextValidMoveDirection, pathAsCharacters, collectedLetters);
  }
};

export const traverseGrid = (pathGrid: PathGrid): FollowPathResult => {
  const startNode = findFirstNodeWithElement(pathGrid, START_VALUE);
  if (startNode == null) {
    throw new Error('No starting point.');
  } else {
    const visitedGrid = createEmptyVisitedGrid(pathGrid);
    return traverseNode(pathGrid, visitedGrid, startNode, ALL_DIRECTIONS[0], '', '');
  }
};

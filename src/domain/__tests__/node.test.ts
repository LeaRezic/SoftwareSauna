import {
  Direction,
  Node,
} from '../../interfaces';
import {
  END_VALUE,
  HORIZONTAL_VALUE,
  START_VALUE,
  TURN_VALUE,
  VERTICAL_VALUE,
} from '../../constants';
import {
  canPathGoToNode,
  createNodeErrorMsg,
  isBasicPathNode,
  isEndNode,
  isLetterNode,
  isStartNode,
  isTurnNode,
} from '../node';

const getNodeWithValue = (val: unknown): Node => {
  return {
    value: val as string,
    coordinates: {
      row: 0,
      column: 0,
    },
  };
};

describe('Is end node', () => {

  it('Should be true for nodes with end value', () => {
    expect(isEndNode(getNodeWithValue(END_VALUE))).toBe(true);
  });

  it('Should be false for nodes without end value', () => {
    expect(isEndNode(getNodeWithValue('@'))).toBe(false);
    expect(isEndNode(getNodeWithValue('B'))).toBe(false);
    expect(isEndNode(getNodeWithValue('-'))).toBe(false);
    expect(isEndNode(getNodeWithValue('|'))).toBe(false);
    expect(isEndNode(getNodeWithValue('~'))).toBe(false);
  });
});

describe('Is letter node', () => {

  it('Should be true for nodes with letter values', () => {
    expect(isLetterNode(getNodeWithValue('A'))).toBe(true);
    expect(isLetterNode(getNodeWithValue('L'))).toBe(true);
    expect(isLetterNode(getNodeWithValue('Z'))).toBe(true);
  });

  it('Should be false for nodes without letter values', () => {
    expect(isLetterNode(getNodeWithValue('@'))).toBe(false);
    expect(isLetterNode(getNodeWithValue('-'))).toBe(false);
    expect(isLetterNode(getNodeWithValue('|'))).toBe(false);
    expect(isLetterNode(getNodeWithValue('~'))).toBe(false);
  });
});

describe('Is turn node', () => {

  it('Should be true for nodes with turn value', () => {
    expect(isTurnNode(getNodeWithValue(TURN_VALUE))).toBe(true);
  });

  it('Should be false for nodes without turn value', () => {
    expect(isTurnNode(getNodeWithValue('@'))).toBe(false);
    expect(isTurnNode(getNodeWithValue('B'))).toBe(false);
    expect(isTurnNode(getNodeWithValue('-'))).toBe(false);
    expect(isTurnNode(getNodeWithValue('|'))).toBe(false);
    expect(isTurnNode(getNodeWithValue('~'))).toBe(false);
  });
});

describe('Is start node', () => {

  it('Should be true for nodes with start value', () => {
    expect(isStartNode(getNodeWithValue(START_VALUE))).toBe(true);
  });

  it('Should be false for nodes without start value', () => {
    expect(isStartNode(getNodeWithValue('x'))).toBe(false);
    expect(isStartNode(getNodeWithValue('B'))).toBe(false);
    expect(isStartNode(getNodeWithValue('-'))).toBe(false);
    expect(isStartNode(getNodeWithValue('|'))).toBe(false);
    expect(isStartNode(getNodeWithValue('~'))).toBe(false);
  });
});

describe('Is basic path node', () => {

  it('Should be true for nodes with vertical or horizontal value', () => {
    expect(isBasicPathNode(getNodeWithValue(VERTICAL_VALUE))).toBe(true);
    expect(isBasicPathNode(getNodeWithValue(HORIZONTAL_VALUE))).toBe(true);
  });

  it('Should be false for nodes without vertical or horizontal value', () => {
    expect(isBasicPathNode(getNodeWithValue('x'))).toBe(false);
    expect(isBasicPathNode(getNodeWithValue('B'))).toBe(false);
    expect(isBasicPathNode(getNodeWithValue('@'))).toBe(false);
    expect(isBasicPathNode(getNodeWithValue('+'))).toBe(false);
    expect(isBasicPathNode(getNodeWithValue('~'))).toBe(false);
  });
});

describe('Can path go to node', () => {

  it('From any direction, path can continue by stepping on an end node', () => {
    expect(canPathGoToNode(getNodeWithValue(END_VALUE), Direction.Up)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(END_VALUE), Direction.Down)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(END_VALUE), Direction.Right)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(END_VALUE), Direction.Left)).toBe(true);
  });

  it('From any direction, path can continue by stepping on a letter node', () => {
    expect(canPathGoToNode(getNodeWithValue('A'), Direction.Up)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue('A'), Direction.Down)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue('A'), Direction.Right)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue('A'), Direction.Left)).toBe(true);
  });

  it('From any direction, path can continue by stepping on a turn node', () => {
    expect(canPathGoToNode(getNodeWithValue(TURN_VALUE), Direction.Up)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(TURN_VALUE), Direction.Down)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(TURN_VALUE), Direction.Right)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(TURN_VALUE), Direction.Left)).toBe(true);
  });

  it('From vertical directions, path can continue by stepping on a vertical path node', () => {
    expect(canPathGoToNode(getNodeWithValue(VERTICAL_VALUE), Direction.Up)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(VERTICAL_VALUE), Direction.Down)).toBe(true);
  });

  it('From vertical directions, path can not continue by stepping on a horizontal path node', () => {
    expect(canPathGoToNode(getNodeWithValue(HORIZONTAL_VALUE), Direction.Up)).toBe(false);
    expect(canPathGoToNode(getNodeWithValue(HORIZONTAL_VALUE), Direction.Down)).toBe(false);
  });

  it('From horizontal directions, path can continue by stepping on a horizontal path node', () => {
    expect(canPathGoToNode(getNodeWithValue(HORIZONTAL_VALUE), Direction.Right)).toBe(true);
    expect(canPathGoToNode(getNodeWithValue(HORIZONTAL_VALUE), Direction.Left)).toBe(true);
  });

  it('From horizontal directions, path can not continue by stepping on a vertical path node', () => {
    expect(canPathGoToNode(getNodeWithValue(VERTICAL_VALUE), Direction.Right)).toBe(false);
    expect(canPathGoToNode(getNodeWithValue(VERTICAL_VALUE), Direction.Left)).toBe(false);
  });
});

describe('Get node error message', () => {

  it('Should construct correct message for inputs', () => {
    const node = { value: 'A', coordinates: { row: 0, column: 0 }};
    expect(createNodeErrorMsg(node, 'Something bad happened')).toBe('Invalid A node at [0][0]\nSomething bad happened');
    expect(createNodeErrorMsg(node, '')).toBe('Invalid A node at [0][0]\n');
  });

  it('Should not construct incorrect message for inputs', () => {
    const node = { value: 'A', coordinates: { row: 0, column: 0 }};
    const message = createNodeErrorMsg(node, 'Something bad happened');
    expect(message).not.toBe('Invalid A node at [0][0]');
    expect(message).not.toBe('Something bad happened');
    expect(message).not.toBe('Wrong');
  });
});

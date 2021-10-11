/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    'src',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(spec|test).+(ts|js)',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
};

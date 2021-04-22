/* eslint-disable @typescript-eslint/no-var-requires */
// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: 'tests/.*\\.test\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    '\\.(ts|tsx)': 'ts-jest',
  },
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  /*
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }), */
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

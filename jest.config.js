/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },

  testEnvironment: 'node',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@generated/(.*)$': '<rootDir>/generated/$1',
  },

  testMatch: ['<rootDir>/src/test/**/*.test.ts'],

  clearMocks: true,
  restoreMocks: true,
};

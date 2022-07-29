module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/fileTransformer.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts', 'mock-local-storage'],
};

process.env = Object.assign(process.env, {
  REACT_APP_API_URL: 'http://example.com',
  REACT_APP_FROM_F1_SEASON_YEAR: '2005',
});

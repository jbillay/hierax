module.exports = {
  roots: ['<rootDir>/server', '<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/*.{js,ts}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};
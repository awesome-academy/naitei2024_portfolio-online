module.exports = {
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/services/**/*.ts',
    '!<rootDir>/src/services/socialLink.service.ts',
    '!<rootDir>/src/services/skillDefine.service.ts'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
}

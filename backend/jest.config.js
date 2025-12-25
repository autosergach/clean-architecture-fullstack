module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};

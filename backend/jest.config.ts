import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};

export default config;

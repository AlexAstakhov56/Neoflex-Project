module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|webp|svg|pdf)$": "<rootDir>/fileMock.cjs",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

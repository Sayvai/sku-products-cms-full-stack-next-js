import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "<rootDir>/jsdom-extended.js", // note: fix required for msw to work, to overcome "TextEncoder is not defined error". source: https://github.com/mswjs/msw/issues/1916#issuecomment-1850757977
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // process and transpile `*.tsx` and `*.ts` files to JavaScript with `ts-jest`
  },
  testEnvironmentOptions: {
    customExportConditions: [""], // note: fix required for msw to work., to overcome "Cannot find module 'msw/node' from 'app/_mocks/msw/server.ts'" source: https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
  },
};

export default config;

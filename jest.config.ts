import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
    preset: 'ts-jest',
    clearMocks: true,
    testMatch: ['<rootDir>/packages/**/*.test.(ts|tsx)'],
    testEnvironment: 'jsdom',
    coverageDirectory: 'coverage',
    modulePathIgnorePatterns: ['<rootDir>/packages/core/dist', '<rootDir>/packages/shared/dist'],
    moduleNameMapper: {
        '^@rchooks/shared$': '<rootDir>/packages/shared/index.ts',
    },
};

export default jestConfig;

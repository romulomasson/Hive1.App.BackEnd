module.exports = {
    clearMocks: true,
    maxWorkers: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/__tests__/**/*.test.ts',
        '**/tests/**/*.test.ts',
    ],
    testTimeout: 20000,
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    },
    coverageDirectory: '__tests__/coverage',
    collectCoverageFrom: ["src/**", "!src/**.json", "!src/interfaces/**" ]
};
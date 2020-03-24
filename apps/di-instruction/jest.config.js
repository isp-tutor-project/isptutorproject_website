module.exports = {
    clearMocks: true,
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx'],
    coveragePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/di/'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/di/'
    ]
};
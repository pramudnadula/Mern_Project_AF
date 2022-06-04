/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    testEnvironment: "node",
    testMatch: ["**/**/*.test.js"],
    forceExit: true
};

module.exports = config;
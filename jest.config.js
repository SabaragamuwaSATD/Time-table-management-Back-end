// jest.config.js
module.exports = {
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};

const nextJest = require("next/jest")

const jestConfig = nextJest({
  dir: "./"
})

const customConfig = jestConfig({
  preset: "ts-jest",
  testEnvironment: "node"
})

module.exports = customConfig

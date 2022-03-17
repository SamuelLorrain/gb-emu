module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: [
        "js",
        "ts"
    ],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
}

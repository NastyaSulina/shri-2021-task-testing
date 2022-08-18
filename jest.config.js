module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {

    },
    moduleDirectories: ["node_modules", __dirname]
}
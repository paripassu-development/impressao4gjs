// noinspection JSUnresolvedVariable
module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
    "globals": {
        "ts-jest": {
            "tsConfigFile": "tsconfig.json",
        }
    },
    "testRegex": "(/__tests__/unit/.*|(\\.|/)(test|spec))\\.(ts?)$",
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "moduleDirectories": [
        "node_modules",
        "__tests__/unit",
        "target"
    ]
};

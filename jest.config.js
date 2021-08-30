module.exports = {
    "roots": [
        "src"
    ],
    "testMatch": [
        "**/_tests/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}
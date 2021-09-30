# InCode Editor
This is the official Editor for the InCode Programming Language by Ben Siebert and Lukas Birke.

[![ESLint](https://github.com/InCodeDevs/Editor/actions/workflows/eslint.yml/badge.svg)](https://github.com/InCodeDevs/Editor/actions/workflows/eslint.yml)
[![Prettier](https://github.com/InCodeDevs/Editor/actions/workflows/prettier.yml/badge.svg)](https://github.com/InCodeDevs/Editor/actions/workflows/prettier.yml)
[![Webpack Build](https://github.com/InCodeDevs/Editor/actions/workflows/build.yml/badge.svg)](https://github.com/InCodeDevs/Editor/actions/workflows/build.yml)
[![Firebase Deploy](https://github.com/InCodeDevs/Editor/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/InCodeDevs/Editor/actions/workflows/firebase-hosting-merge.yml)

## Features
- A monaco based Code Editor
- A blockly based Block Editor
- Projects

## Building from Source
```shell
# Getting the code

# For stable code
git clone https://github.com/InCodeDevs/InCode-Editor.git
# For development (UNSTABLE)
git clone --branch latest https://github.com/InCodeDevs/InCode-Editor.git

cd InCode-Editor

# Start the development Server (for local testing)
npm start

# Build (for production)
yarn webpack:build-prod 

# Build (for development)
yarn webpack:build-dev
```

### Versions

| Description   | Version          |
|---------------|------------------|
| Current Stable Version  | 3.0.0  |
| Current Development Version  | 3.1.0  |
| Legacy Version(s)  | 1.0.0  |

<span style="font-family: monospace">Copyright © 2018-2021 The InCode Developers.</span>

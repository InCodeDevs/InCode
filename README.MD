
# InCode Editor

[![DevOps](https://github.com/InCodeDevs/Editor/actions/workflows/main.yml/badge.svg)](https://github.com/InCodeDevs/Editor/actions/workflows/main.yml)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://choosealicense.com/licenses/gpl-3.0/)
[![LoC](https://sloc.xyz/github/InCodeDevs/Editor/?category=lines)](https://sloc.xyz/github/InCodeDevs/Editor/?category=code)
[![Status](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/badges/latest/active.svg)


This is the repository for the official editor, documentation and playground for the InCode programming language.

<div align='center'>
<img src="https://incodelang.de/assets/incode-400.png">
</div>


## Features

- Projects
- Cross device sync
- Accounts
- Full InCode Support
    - German
    - English
- Multi Language
    - German
    - English
- Templates
- Project publishing
- Project sharing
- Integrated Documentation
- Playground
- Code Editor (monaco based)
- Block Editor (blockly based)

## Screenshots

![App Screenshot](https://upload.craftions.net/file/af1zwHwGWa/Screenshot%202022-02-12%20211356.png)

![App Screenshot](https://upload.craftions.net/file/gIXzIpgJyC/Screenshot%202022-02-12%20211452.png)

![App Screenshot](https://upload.craftions.net/file/uAtA2QJi2B/Screenshot%202022-02-12%20211504.png)

![App Screenshot](https://upload.craftions.net/file/5o8UTMDVLW/Screenshot%202022-02-12%20211513.png)

## Demo

[Demo](https://incodelang.de/)

## Documentation

[Documentation](https://incodelang.de/docs)


## Run Locally

Clone the project

```bash
  git clone https://github.com/InCodeDevs/Editor.git --branch v4.x editor
```

Go to the project directory

```bash
  cd editor
```

Install yarn (if not installed)

```bash
  sudo npm install -g yarn
```

Install dependencies

```bash
  yarn install
```

Build the app for production

```bash
  yarn webpack:build-prod
```

Build the app for development

```bash
  yarn webpack:build-dev
```

Start the server (without rebuilding the app)

```bash
  yarn express:only-start
```

Start the server (with rebuilding the app on changes)

```bash
  yarn express:live-start
```
## Deployment

Deploying a Docker container

To build a docker container you will first need to download and install Docker from https://docker.com.
You will also need NodeJS, NPM and Yarn installed on your system. Download and install NodeJS from https://nodejs.com and run

```bash
  npm install -g yarn
```

To build a docker container run:
```bash
  yarn docker:build
```

The container will be named `mctzock/incode-editor`. You can change this in the package.json file.
## API Reference




## Related

Here are some related projects

- [@incodelang/compiler](https://github.com/InCodeDevs/Compiler)
- [@incodelang/cli](https://github.com/InCodeDevs/CLI)
- [@incodelang/accounts](https://github.com/InCodeDevs/Accounts)
- [@incodelang/urlshorter](https://github.com/InCodeDevs/URLShorter)
- [@incodelang/syntax-highlighting](https://github.com/InCodeDevs/syntax)

## Authors

- [Ben Siebert](https://github.com/MCTzOCK)
- [Lukas Birke](https://github.com/MisterMysticOfficial)

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)


## Support

For support, join our Discord server at https://discord.gg/9T5JEyXsrA


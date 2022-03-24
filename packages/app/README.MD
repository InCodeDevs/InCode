
# @incodelang/app

This package contains the Frontend Code of the InCode Editor.

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
- Documentation
- Playground
- Code Editor (monaco based)
- Block Editor (blockly based)
- Admin Panel
  - Manage Accounts
  - View Statistics
  - Reboot Server

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
  git clone https://github.com/InCodeDevs/InCode.git --branch v4.x incode
```

Go to the project directory

```bash
  cd editor
```

Install yarn (if not installed)

```bash
  sudo npm install -g yarn
```

Install lerna (if not installed)

```bash
  sudo npm install -g lerna
```

Install dependencies

```bash
  lerna link && lerna bootstrap
```

Build the app for production

```bash
  lerna run webpack:build-prod
```

Build the app for development

```bash
  lerna run webpack:build-dev
```

Start the server (without rebuilding the app)

```bash
  lerna run express:only-start
```

Start the server (with rebuilding the app on changes)

```bash
  lerna run express:live-start
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

## Authors

- [Ben Siebert](https://github.com/MCTzOCK)
- [Lukas Birke](https://github.com/MisterMysticOfficial)

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)


## Support

For support, join our Discord server at https://discord.gg/9T5JEyXsrA


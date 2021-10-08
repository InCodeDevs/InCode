
# InCode Editor

This is the official Editor for the InCode Programming Language by Ben Siebert and Lukas Birke.



## Features

- Full Support of the latest InCode Version
- Code Preview
- Themes
- Accounts (work on all your devices)
- Documentation
- Video Tutorials
- Code Editor
- Blockly based Block Editor
- Multi Language Support
- Templates (Publish and use)
- Publish Projects
- Powerfull API
- One Command Installation with Docker
- Dark mode
## Demo

[Demo](https://editor.incodelang.de)


## Deployment

Deploy with Docker

```bash
    docker run --publish 80:3000 mctzock/incode-editor
```

Deploy with yarn

```bash
    # install dependencies
    yarn
    
    # build for production
    yarn webpack:build-prod

    # start expressjs server
    yarn express:only-start
```

Deploy with npm

```bash
    # install dependencies
    npm install
    
    # build for production
    npm run webpack:build-prod

    # start expressjs server
    npm run express:only-start
```
## Run Locally

- Clone the project

```bash
  git clone https://github.com/InCodeDevs/Editor.git
```

- Go to the project directory

```bash
  cd Editor
```

- Install dependencies

```bash
  # with yarn
  yarn
  
  # with npm
  npm install
```

- Start the server without live reload

```bash
  # with yarn
  yarn express:prod-start

  # with npm
  npm run express:prod-start
```

- Start the server with live reload

```bash
  # with yarn
  yarn nodemon:start

  # with npm
  npm run nodemon:start
```

## API Reference

### User API

The User API can be found in the [@incodelang/accounts](https://github.com/InCodeDevs/Accounts#api-reference) package

### Template API

The Template API can be found in the [@incodelang/templates](https://github.com/InCodeDevs/Templates#api-reference) package

## License

[GNU General Public License v3.0 only](https://choosealicense.com/licenses/gpl-3.0/)


## Authors

- [@mctzock](https://www.github.com/MCTzOCK)
- [@mistermysticofficial](https://www.github.com/MisterMysticOfficial)

## Related

Here are some related projects

- [InCode](https://github.com/InCodeDevs/Language)
- [InCode CLI](https://github.com/InCodeDevs/CLI)
- [Account Server](https://github.com/InCodeDevs/Accounts)
- [Template Server](https://github.com/InCodeDevs/Templates)

  
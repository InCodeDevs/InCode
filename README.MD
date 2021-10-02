
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

The parameters must be send in the request body as JSON format.

### User API

| Response | Description                |
| :-------- | :------------------------- |
| `{"error": false, "message": "response message, e.g. data"}` | The request was successful |
| `{"error": true, "message": "errror message"}` | The request failed |


#### Create a user

```http
  POST /api/v1/user/users/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |

#### Delete a user

```http
  POST /api/v1/user/users/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |

#### Login

```http
  POST /api/v1/user/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |

#### Check if a User exists

```http
  POST /api/v1/user/users/exists
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | The name of the user |

#### Update Username

```http
  POST /api/v1/user/users/update/username
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `old` | `string` | The current name of the user |
| `username` | `string` | The new name of the user |
| `password` | `string` | The password of the user |

#### Update Password

```http
  POST /api/v1/user/users/update/password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The new password of the user |
| `old` | `string` | The current password of the user |

#### User Data API

#### Store Data

```http
  POST /api/v1/user/users/data/store
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `data` | `string` | The actual data |
| `dataName` | `string` | The name of the data |

#### Delete Data

```http
  POST /api/v1/user/users/data/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `dataName` | `string` | The name of the data |

#### Get Data

```http
  POST /api/v1/user/users/data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `dataName` | `string` | The name of the data |

#### Get All Data

```http
  POST /api/v1/user/users/data/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |

#### Global Data API

#### Set Data

```http
  POST /api/v1/user/data/set
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `value` | `string` | The actual data |
| `key` | `string` | The name of the data |

#### Delete Data

```http
  POST /api/v1/user/data/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `key` | `string` | The name of the data |

#### Grant Access

```http
  POST /api/v1/user/data/allow
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `key` | `string` | The name of the data |
| `newUser` | `string` | The name of the new user |

#### Revoke Access

```http
  POST /api/v1/user/data/disallow
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `key` | `string` | The name of the data |
| `newUser` | `string` | The name of the new user |

#### Get Public Data

```http
  POST /api/v1/user/data/get
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `key` | `string` | The name of the data |

### Template API

#### Upload Template

```http
  GET /api/v1/template/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type` | `monaco` or `blockly` | The type of the template |
| `name` | `string` | The name of the template |
| `code` | `string` | The actual code |

#### Download Template

```http
  GET /api/v1/template/data/templates/{name}.ic
```

#### List all Templates

```http
  GET /api/v1/template/data/templates.json
```


## License

[GNU General Public License v3.0 only](https://choosealicense.com/licenses/gpl-3.0/)


## Authors

- [@mctzock](https://www.github.com/MCTzOCK)
- [@mistermysticofficial](https://www.github.com/MisterMysticOfficial)
## Related

Here are some related projects

- [InCode](https://github.com/InCodeDevs/Language)
- [InCode CLI](https://github.com/InCodeDevs/CLI)

  
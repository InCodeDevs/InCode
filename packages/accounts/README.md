
# @incodelang/accounts

A simple account management server for your node.js application.



## Installation

Install @incodelang/accounts with npm

```bash
  npm install @incodelang/accounts
```

Install @incodelang/accounts with yarn

```bash
  yarn add @incodelang/accounts
```


## Usage/Examples

Integrate in your own express.js application

```javascript
const { accountServer } = require('@incodelang/accounts')
const express = require('express')

const app = express();

app.listen(3000, "0.0.0.0");

accountServer({
    app: app
})

```

Standalone express.js application

```javascript
const { accountServer, sampleApp } = require('@incodelang/accounts')

accountServer({
    app: sampleApp(
        3000, // port [default] = 3000
        "0.0.0.0" // host [default] = "0.0.0.0"
    )
})

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
| `password` | `string` | The password of the user (or a token)|

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

#### Postboxes API

#### Create a Postbox

```http
  POST /api/v1/user/postboxes/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `name` | `string` | The name of the postbox |

#### Delete a Postbox

```http
  POST /api/v1/user/postboxes/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `name` | `string` | The name of the postbox |

#### Add Data to a Postbox

```http
  POST /api/v1/user/postboxes/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `name` | `string` | The name of the postbox |
| `owner` | `string` | The owner of the postbox |
| `entry` | `string` or `object` | The data you want to add |

#### Clear a Postbox

```http
  POST /api/v1/user/postboxes/clear
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `name` | `string` | The name of the postbox |

#### Read a Postbox

```http
  POST /api/v1/user/postboxes/read
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |
| `name` | `string` | The name of the postbox |

#### Check if a Postbox exists

```http
  POST /api/v1/user/postboxes/exists
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `owner` | `string` | The owner of the postbox |
| `name` | `string` | The name of the postbox |

### Tokens

#### Create a Token

```http
  POST /api/v1/user/tokens/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | The name of the user |
| `password` | `string` | The password of the user |

## Authors

- [@mctzock](https://www.github.com/mctzock)


## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

  
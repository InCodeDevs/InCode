
# @incodelang/urlshorter

A simple way to short urls


## Installation

Install @incodelang/urlshorter with npm

```bash
  npm install @incodelang/urlshorter
```

Install @incodelang/urlshorter with yarn

```bash
  yarn add @incodelang/urlshorter
```

## Usage/Examples

Integrate in your own express.js application

```javascript
const { urlServer } = require('@incodelang/urlshorter')
const express = require('express')

const app = express();

app.listen(3000, "0.0.0.0");

urlServer({
    app: app,
    prefix: "app" // prefix of the shorted urls
})
```

Standalone express.js application

```javascript
const { urlServer, sampleApp } = require('@incodelang/urlshorter')

urlServer({
    app: sampleApp(
        3000, // port [default] = 3000
        "0.0.0.0" // host [default] = "0.0.0.0"
    ),
    prefix: "app" // prefix of the shorted urls
})

```

## API Reference

#### Create Link

```http
  GET /api/v1/url/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `target` | `string` | The url target |

Returns a JSON Object with the fields `error`, `message` and `id`

#### View shorted URL

```http
  GET /{prefix}/{id}
```


## Authors

- [@mctzock](https://www.github.com/mctzock)


## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

  
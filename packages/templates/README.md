
# @incodelang/templates

A Server for storing templates


## Installation

Install @incodelang/templates with npm

```bash
  npm install @incodelang/templates
```

Install @incodelang/templates with yarn

```bash
  yarn add @incodelang/templates
```

## Usage/Examples

Integrate in your own express.js application

```javascript
const { templateServer } = require('@incodelang/templats')
const express = require('express')

const app = express();

app.listen(3000, "0.0.0.0");

templateServer({
    app: app
})
```

Standalone express.js application

```javascript
const { templateServer, sampleApp } = require('@incodelang/templates')

templateServer({
    app: sampleApp(
        3000, // port [default] = 3000
        "0.0.0.0" // host [default] = "0.0.0.0"
    )
})

```

## API Reference

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


## Authors

- [@mctzock](https://www.github.com/mctzock)


## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

  

# @incodelang/accounts-client

This package is a client for websites to interact with [@incodelang/accounts](https://github.com/InCodeDevs/Accounts)
## Installation

Install @incodelang/accounts-client with npm

```bash
  npm install @incodelang/accounts-client
```

Install @incodelang/accounts-client with yarn

```bash
  yarn add @incodelang/accounts-client
```


## Examples

```javascript
const {WebClient} = require('@incodelang/accounts-client');

const client = new WebClient(""); // enter the root url of the server here (leave empty for /) 

// check the credentials of a user
client.login("username", "password").then(success => {
    console.log(success);
})
```

## Authors

- [@mctzock](https://www.github.com/mctzock)


## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)


## Related

Here are some related projects

- [@incodelang/accounts](https://github.com/InCodeDevs/Accounts)
  
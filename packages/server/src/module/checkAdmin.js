/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const { login } = require("@incodelang/accounts/src/lib/module/users");

module.exports = (req) => {
  if (req.body && req.body.username && req.body.password) {
    if (req.body.username === "admin") {
      return !login(req.body.username, req.body.password).error;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

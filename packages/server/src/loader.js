/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const { accountServer } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");

module.exports = (app) => {
  require("./routes/main.route")(app);
  require("./routes/bundle.route")(app);
  require("./routes/usercontent.route")(app);

  require("./api/compiler")(app);
  require("./api/generator/desktop")(app);
  require("./api/publish/project")(app);
  require("./api/templates")(app);
  require("./api/job")(app);
  require("./api/admin")(app);
  require("./api/admin/users")(app);
  require("./api/admin/data")(app);
  require("./api/admin/postbox")(app);
  require("./api/analytics")(app);
  require("./api/content")(app);

  accountServer({
    app: app,
    disable: {
      updateUsername: true,
    },
  });
  urlServer({ app: app, prefix: "project" });

  require("./api/error/404")(app);
  require("./api/error/500")(app);
};

const {
  utils: { fromBuildIdentifier },
} = require("@electron-forge/core");

module.exports = {
  buildIdentifier: process.env.IS_BETA ? "beta" : "prod",
  packagerConfig: {
    appBundleId: fromBuildIdentifier({
      beta: "de.incodelang.beta.editor",
      prod: "de.incodelang.editor",
    }),
  },
};

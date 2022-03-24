/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

if (
  !fs.existsSync(
    path.join(os.homedir(), ".incode", "analytics", "analytics.json")
  )
) {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "analytics", "analytics.json"),
    JSON.stringify([])
  );
}

function analyze(data) {
  const analytics = JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "analytics", "analytics.json")
      )
      .toString()
  );
  analytics.push(data);
  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "analytics", "analytics.json"),
    JSON.stringify(analytics)
  );
}

function getAnalytics() {
  return JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "analytics", "analytics.json")
      )
      .toString()
  );
}

module.exports = {
  analyze,
  getAnalytics,
};

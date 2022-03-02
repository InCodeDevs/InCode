/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const moment = require("moment");

const LIMIT_PER_DAY = 3;
const RESET_AFTER = 1000 * 60 * 60 * 24;

if (
  !fs.existsSync(
    path.join(os.homedir(), ".incode", "generator", "desktop.json")
  )
) {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "generator", "desktop.json"),
    "{}"
  );
}

function getUserRateLimit(username) {
  const limits = JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "generator", "desktop.json")
      )
      .toString()
  );
  if (limits[username] === undefined) {
    limits[username] = {
      rateLimit: {
        remaining: LIMIT_PER_DAY,
        reset: Date.now() + RESET_AFTER,
      },
    };
  }
  return limits[username].rateLimit;
}

function hasReachedUserRateLimit(username) {
  const limits = JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "generator", "desktop.json")
      )
      .toString()
  );
  if (limits[username] === undefined) {
    limits[username] = {
      rateLimit: {
        remaining: LIMIT_PER_DAY,
        reset: Date.now() + RESET_AFTER,
      },
    };
  }

  return limits[username].rateLimit.remaining > 0;
}

function resetRateLimit(username) {
  const limits = JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "generator", "desktop.json")
      )
      .toString()
  );
  if (limits[username] === undefined) {
    limits[username] = {
      rateLimit: {
        remaining: LIMIT_PER_DAY,
        reset: Date.now() + RESET_AFTER,
      },
    };
  }

  if (moment(Date.now()).isAfter(moment(limits[username].rateLimit.reset))) {
    limits[username].rateLimit.remaining = LIMIT_PER_DAY;
    limits[username].rateLimit.reset = Date.now() + RESET_AFTER;
  }

  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "generator", "desktop.json"),
    JSON.stringify(limits)
  );
}

function generateApp(username, project) {}

module.exports = {
  getUserRateLimit,
  hasReachedUserRateLimit,
  generateApp,
};

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

if (
  !fs.existsSync(
    path.join(os.homedir(), ".incode", "push", "subscriptions.json")
  )
) {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "push", "subscriptions.json"),
    "{}"
  );
}

let config = {};
reload();

function save() {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode", "push", "subscriptions.json"),
    JSON.stringify(config)
  );
}

function reload() {
  config = JSON.parse(
    fs
      .readFileSync(
        path.join(os.homedir(), ".incode", "push", "subscriptions.json")
      )
      .toString()
  );
}

const push = require("web-push");
const { users } = require("@incodelang/accounts");

const vapid = {
  public: process.env.vapid_public_key,
  private: process.env.vapid_private_key,
  subject: process.env.vapid_subject,
};

push.setVapidDetails(vapid.subject, vapid.public, vapid.private);

function setSubscription(username, password, sub) {
  if (users.login(username, password)) {
    config[username] = sub;
    save();
    return {
      error: false,
      message: "Subscription saved.",
    };
  } else {
    return users.login(username, password);
  }
}

function getSubscription(username) {
  return config[username] || {};
}

function sendNotification(username, content) {
  push.sendNotification(getSubscription(username), content);
  return {
    error: false,
    message: "Notification sent.",
  };
}

module.exports = { vapid, setSubscription, getSubscription, sendNotification };

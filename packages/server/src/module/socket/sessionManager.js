/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */
const { v4 } = require("uuid");

const sessions = [];

function createSession(projectAP) {
  const session = {
    sid: v4(),
    projectAP,
    users: [],
    createdAt: new Date(),
    secret: v4(),
    currentData: "",
  };
  sessions.push(session);
  return session;
}

function addUserToSession(sessionId, username) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    session.users.push(username);
  }
}

function removeUserFromSession(sessionId, username) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    session.users = session.users.filter((user) => user !== username);
  }
}

function getUsersInSession(sessionId) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    return session.users;
  }
  return [];
}

function getSession(projectAP) {
  let ret = null;
  sessions.forEach((session) => {
    if (session.projectAP === projectAP) {
      ret = session;
    }
  });
  if (ret === null) {
    ret = createSession(projectAP);
  }
  return ret;
}

function deleteSession(projectAP) {
  sessions.forEach((session, index) => {
    if (session.projectAP === projectAP) {
      sessions.splice(index, 1);
    }
  });
}

function setCurrentData(sessionId, data) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    session.currentData = data;
  }
}

function getAllSessions() {
  return sessions;
}

module.exports = {
  createSession,
  addUserToSession,
  removeUserFromSession,
  getUsersInSession,
  getSession,
  deleteSession,
  setCurrentData,
  getAllSessions,
};

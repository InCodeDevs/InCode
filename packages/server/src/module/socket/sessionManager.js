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

function addUserToSession(sessionId, username, socket) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    session.users.push({ username, socket });
  }
}

function removeUserFromSession(sessionId, username) {
  const session = sessions.find((session) => session.sid === sessionId);
  if (session) {
    session.users = session.users.filter((user) => user.username !== username);
    if (session.users.length === 0) {
      deleteSession(sessionId);
    }
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

function deleteSession(sessionId) {
  sessions.forEach((session, index) => {
    if (session.sid === sessionId) {
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

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */
const { v4 } = require("uuid");

class SessionManager {
  static sessions = [];

  static getSession(sessionId) {
    return SessionManager.sessions.find(
      (session) => session.sessionId === sessionId
    );
  }

  static createSession(publicData, username) {
    const session = {
      sessionId: v4(),
      project: publicData,
      createdAt: new Date(),
      members: [username],
    };
    SessionManager.sessions.push(session);
    return session;
  }

  static addMember(sessionId, username) {
    const session = SessionManager.getSession(sessionId);
    if (session) {
      session.members.push(username);
    }
  }

  static removeMember(sessionId, username) {
    const session = SessionManager.getSession(sessionId);
    if (session) {
      session.members = session.members.filter((member) => member !== username);
      if (session.members.length === 0) {
        SessionManager.deleteSession(sessionId);
      }
    }
  }

  static deleteSession(sessionId) {
    const session = SessionManager.getSession(sessionId);
    if (session) {
      SessionManager.sessions = SessionManager.sessions.filter(
        (session) => session.sessionId !== sessionId
      );
    }
  }

  static exists(publicData) {
    return SessionManager.sessions.find(
      (session) => session.project === publicData
    );
  }
}

module.exports = { SessionManager };

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require("chalk");
const { login } = require("@incodelang/accounts/src/lib/module/users");
const sessionManager = require("./sessionManager");
const { getData } = require("@incodelang/accounts/src/lib/module/data");
const { getFullDataConfig } = require("../account_patcher");
const { setCurrentData } = require("./sessionManager");

/** @param {import('socket.io').Server} [io] */
module.exports = (io) => {
  io.on(
    "connection",
    /** @param {import('socket.io').Socket} socket */
    (socket) => {
      let uname = "";
      let credentialsAccepted = false;

      socket.on("credentials", (data) => {
        const { username, token } = data;
        if (login(username, token).error === false) {
          credentialsAccepted = true;
          uname = username;
          socket.emit("credentials", {
            success: true,
            message: "Credentials accepted",
          });
        } else {
          socket.emit("credentials", {
            success: false,
            message: "Credentials rejected",
          });
        }
      });

      socket.on("project open", (data) => {
        if (credentialsAccepted) {
          const { projectData } = data;
          const fullDataConfig = getFullDataConfig(projectData);
          if (
            fullDataConfig[projectData] === undefined ||
            fullDataConfig[projectData] === null
          ) {
            socket.emit("project open", {
              success: false,
              message: "Project not found",
            });
            return;
          }

          if (!fullDataConfig[projectData].access.includes(uname)) {
            socket.emit("project open", {
              success: false,
              message: "You do not have access to this project",
            });
            return;
          }

          const session = sessionManager.getSession(projectData);

          if (!session.users.find((user) => user.username === uname)) {
            sessionManager.addUserToSession(session.sid, uname, socket.id);
          }

          if (session.currentData === "") {
            sessionManager.setCurrentData(
              session.sid,
              JSON.parse(fullDataConfig[projectData].data).code
            );
          }

          socket.emit("project open", {
            success: true,
            message: "Session created",
            session,
          });
          console.log(JSON.stringify(sessionManager.getAllSessions(), null, 2));
        }
      });

      socket.on("project change", (data) => {
        if (!data.sid || !data.secret || !data.newValue) {
          socket.emit("project change", {
            success: false,
            message: "Invalid data",
          });
          return;
        }

        const session = sessionManager
          .getAllSessions()
          .find(
            (session) =>
              session.sid === data.sid && session.secret === data.secret
          );

        if (!session) {
          socket.emit("project change", {
            success: false,
            message: "Invalid session",
          });
          return;
        }

        setCurrentData(session.sid, data.newValue);

        const socketIds = session.users.map((user) => user.socket);

        socket.broadcast.to(socketIds).emit("project changed", {
          success: true,
          message: "Project changed",
          newValue: data.newValue,
          from: uname,
          at: new Date().toISOString(),
        });
      });

      socket.on("disconnect", () => {
        sessionManager.getAllSessions().forEach((session) => {
          if (session.users.find((user) => user.socket === socket.id)) {
            sessionManager.removeUserFromSession(session.sid, uname);
          }
        });
      });
    }
  );
};

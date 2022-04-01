/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require("chalk");
const { login } = require("@incodelang/accounts/src/lib/module/users");
const sessionManager = require("./sessionManager");
const { getData } = require("@incodelang/accounts/src/lib/module/data");
const { getFullDataConfig } = require("../account_patcher");

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

          if (!session.users.includes(uname)) {
            session.users.push(uname);
          }

          if (session.currentData === "") {
            sessionManager.setCurrentData(
              session.sid,
              JSON.parse(fullDataConfig[projectData].data)
            );
          }

          socket.emit("project open", {
            success: true,
            message: "Session created",
            session,
          });
          console.log(sessionManager.getAllSessions());
        }
      });

      socket.on("disconnect", () => {
        console.log(chalk.red("Client disconnected"));
      });
    }
  );
};

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { Socket, io } from "socket.io-client";
import UserManager from "./UserManager";
import { ISession } from "../types/ISession";

export default class SocketConnection {
  private static socket: Socket;

  public static currentSession: ISession = {
    sid: "0",
    currentData: "",
    createdAt: new Date(),
    projectAP: "",
    secret: "",
    users: [],
  };

  public static connect() {
    if (UserManager.isLoggedIn()) {
      this.socket = io(location.protocol + "//" + location.host);
      this.socket.emit("credentials", {
        username: UserManager.getUsername(),
        token: UserManager.getToken(),
      });
      this.socket.on("credentials", (data) => {
        if (data.success) {
          console.log("Credentials accepted by server");
        }
      });
    }
  }

  public static openProject(projectName: string) {
    this.socket.emit("project open", {
      projectData: projectName,
    });

    this.socket.on("project open", (data) => {
      if (data.success) {
        this.currentSession = data.session;
        console.log("Got Session: ", this.currentSession);
      } else {
        console.log("Error opening project: ", data);
      }
    });
  }

  public static disconnect() {
    this.socket.disconnect();
  }

  get socket(): Socket {
    return SocketConnection.socket;
  }
}

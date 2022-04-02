/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { io, Socket } from "socket.io-client";
import UserManager from "./UserManager";
import { ISession } from "../types/ISession";
import { Registry } from "./Registry";
import { ProjectConfig } from "../types/ProjectConfig";
import Blockly from "blockly";

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

      this.socket.on("project changed", (data) => {
        const { newValue, from } = data;
        if (from === UserManager.getUsername()) {
          return;
        }
        // @ts-ignore
        const oldPosition = window.editor.getPosition();
        // @ts-ignore
        window.editor.setValue(newValue);
        // @ts-ignore
        window.editor.setPosition(oldPosition);
      });
    }
  }

  public static openProject(projectName: string) {
    if (Registry.getRegister(0x053) === "code") {
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
  }

  public static submitChange(newValue: string) {
    if (this.currentSession.sid !== "0") {
      const pConf: ProjectConfig = Registry.getRegister(0x052) as ProjectConfig;
      pConf.code = newValue;

      this.socket.emit("project change", {
        sid: this.currentSession.sid,
        secret: this.currentSession.secret,
        newValue: newValue,
      });
    }
  }

  public static disconnect() {
    this.socket.disconnect();
  }

  get socket(): Socket {
    return SocketConnection.socket;
  }
}

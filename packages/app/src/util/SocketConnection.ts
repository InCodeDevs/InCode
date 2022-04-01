/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { Socket, io } from "socket.io-client";

export default class SocketConnection {
  private static socket: Socket;

  public static connect() {
    this.socket = io(location.protocol + "//" + location.host);
  }

  public static disconnect() {
    this.socket.disconnect();
  }

  get socket(): Socket {
    return SocketConnection.socket;
  }
}

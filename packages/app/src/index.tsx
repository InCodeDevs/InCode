/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import "./styles/styles.scss";
import * as React from "react";
import InteractionManager from "./util/InteractionManager";
import Settings from "./util/Settings";
import CommandPaletteManager from "./util/CommandPaletteManager";
import OpenCommand from "./util/commands/OpenCommand";
import CreateCommand from "./util/commands/CreateCommand";
import RouteManager from "./util/RouteManager";
import Feed from "./util/Feed";
import SocketConnection from "./util/SocketConnection";
import Connection from "./util/Connection";

if (!Settings.isValid()) {
  Settings.reset();
}

CommandPaletteManager.registerCommand(new OpenCommand());
CommandPaletteManager.registerCommand(new CreateCommand());

window.onload = () => {
  new InteractionManager();
  RouteManager.manage();
  Feed.runTask();
  Connection.runTask();
  Connection.update();
  SocketConnection.connect();
};

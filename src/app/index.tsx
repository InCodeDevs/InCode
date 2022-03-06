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
import ServiceWorker from "./util/ServiceWorker";
import PopupManagerReloaded from "./util/PopupManagerReloaded";

if (!Settings.isValid()) {
  Settings.reset();
}

CommandPaletteManager.registerCommand(new OpenCommand());
CommandPaletteManager.registerCommand(new CreateCommand());

window.onload = () => {
  new InteractionManager();
  RouteManager.manage();

  ServiceWorker.register();

  PopupManagerReloaded.confirm({
    title: "Titel",
    description: "Beschreibung",
    onAgree: () => {
      alert("Agree");
    },
    onDisagree: () => {
      alert("Disagree");
    },
  });
};

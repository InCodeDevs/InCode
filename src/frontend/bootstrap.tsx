/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "./util/UIManager";
import MainMenu from "./views/MainMenu";
import KeyManager from "./util/KeyManager";
import InteractionManager from "./util/InteractionManager";
import Settings from "./util/Settings";
import CommandPaletteManager from "./util/CommandPaletteManager";
import OpenCommand from "./util/commands/OpenCommand";
import CreateCommand from "./util/commands/CreateCommand";
import SelectApp from "./views/SelectApp";

if (!Settings.isValid()) {
  Settings.reset();
}

CommandPaletteManager.registerCommand(new OpenCommand());
CommandPaletteManager.registerCommand(new CreateCommand());

window.onload = () => {
  new InteractionManager();
  if (location.pathname.startsWith("/app")) {
    new KeyManager();

    UIManager.showComponent(<MainMenu />);
  } else if (location.pathname.startsWith("/docs")) {
    UIManager.showComponent(<h1>Hello World</h1>);
  } else {
    UIManager.showComponent(<SelectApp />);
  }
};

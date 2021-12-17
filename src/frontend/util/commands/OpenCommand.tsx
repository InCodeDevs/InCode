/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { Command } from "../../types/Command";
import UIManager from "../UIManager";
import * as React from "react";
import Settings from "../../views/Settings/Settings";
import OpenProject from "../../views/Project/OpenProject";
import Playground from "../../views/Playground";
import MainMenu from "../../views/MainMenu";
import CreateProject from "../../views/Project/CreateProject";
import ProjectManager from "../ProjectManager";

export default class OpenCommand implements Command {
  execute(args: string[]): void {
    if (args.length > 0) {
      switch (args[0].toLowerCase()) {
        case "settings":
          UIManager.showComponent(<Settings />, "root");
          break;
        case "project":
          UIManager.showComponent(<OpenProject />, "root");
          break;
        case "playground":
          UIManager.showComponent(<Playground />, "root");
          break;
        case "main":
          UIManager.showComponent(<MainMenu />, "root");
          break;
        case "ext:docs":
          window.open("https://docs.incodelang.de/", "_blank");
          break;
        case "create":
          UIManager.showComponent(<CreateProject />, "root");
          break;
        default:
          break;
      }
    }
  }

  name: string = "open";
}

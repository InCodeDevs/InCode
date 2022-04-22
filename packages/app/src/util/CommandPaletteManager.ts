/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { Command } from "../types/Command";
import Settings from "./Settings";

export default class CommandPaletteManager {
  public static commands: Command[] = [];

  public static dispose() {
    (
      document.querySelector("#command-palette-wrapper") as HTMLDivElement
    ).style.display = "none";
  }

  public static show() {
    if (!CommandPaletteManager.isShown()) {
      (
        document.querySelector("#command-palette-wrapper") as HTMLDivElement
      ).style.display = "block";

      (
        document.getElementById("command-palette-input") as HTMLInputElement
      ).value = ":";
      (
        document.getElementById("command-palette-input") as HTMLInputElement
      ).focus();
    } else {
      CommandPaletteManager.dispose();
    }
  }

  public static isShown(): boolean {
    return (
      (document.querySelector("#command-palette-wrapper") as HTMLDivElement)
        .style.display === "block"
    );
  }

  public static registerCommand(command: Command) {
    CommandPaletteManager.commands.push(command);
    console.log("Registered command: " + command.name);
  }

  public static executeCommand(command: string) {
    const name = command.split(" ")[0].split(":")[1].toLowerCase();
    const args = command.split(" ").slice(1);

    if (name === "quit" || name === "exit" || name === "q") {
      CommandPaletteManager.dispose();
      return;
    }

    if (name === "offline") {
      alert(Settings.isOffline());
    }

    CommandPaletteManager.commands.forEach((cmd) => {
      if (cmd.name.toLowerCase() === name.toLowerCase()) {
        CommandPaletteManager.dispose();
        cmd.execute(args);
      }
    });
  }
}

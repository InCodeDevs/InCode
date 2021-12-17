/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class CommandPaletteManager {
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
}

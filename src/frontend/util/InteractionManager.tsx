import PopupManager from "./PopupManager";
import * as React from "react";
import CommandPaletteManager from "./CommandPaletteManager";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class InteractionManager {
  constructor() {
    this.trackCopyright();
    this.trackCommandPalette();
  }

  private trackCopyright() {
    (
      document.querySelector(".copyright-notice") as HTMLDivElement
    ).addEventListener("click", () => {
      // @ts-ignore
      const version = _VERSION;
      // @ts-ignore
      const shortCommit = _GIT_SHORT_COMMIT;
      // @ts-ignore
      const longCommit = _GIT_LONG_COMMIT;
      PopupManager.showPopup(
        "Alert",
        "name",
        <>
          <ul>
            <li>
              Website:&nbsp;
              <a href={"https://incodelang.de"} target={"_blank"}>
                incodelang.de
              </a>
            </li>
            <li>
              Version:&nbsp;
              <a
                href={
                  "https://github.com/InCodeDevs/Editor/tree/dev-v" + version
                }
                target={"_blank"}
              >
                {version}
              </a>
            </li>
            <li>
              Commit:&nbsp;
              <a
                href={
                  "https://github.com/InCodeDevs/Editor/commit/" + longCommit
                }
                target={"_blank"}
              >
                {shortCommit}
              </a>
            </li>
            <li>
              License:&nbsp;
              <a
                href={"https://choosealicense.com/licenses/gpl-3.0"}
                target={"_blank"}
              >
                GNU Genral Public License version 3.0
              </a>
            </li>
            <li>
              Total Files:&nbsp;
              <a>
                {
                  // @ts-ignore
                  _FILE_COUNT
                }
              </a>
            </li>
            <li>
              Total Lines:&nbsp;
              <a>
                {
                  // @ts-ignore
                  _LINE_COUNT
                }
              </a>
            </li>
          </ul>
        </>
      );
    });
  }

  private trackCommandPalette() {
    (
      document.getElementById("command-palette-input") as HTMLInputElement
    ).addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        const command = (
          document.getElementById("command-palette-input") as HTMLInputElement
        ).value;
        if (command.length > 0 && command.startsWith(":")) {
          CommandPaletteManager.executeCommand(command);
        }
      }
    });
  }
}

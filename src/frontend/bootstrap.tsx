/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "./util/UIManager";
import MainMenu from "./views/MainMenu";
import PopupManager from "./util/PopupManager";
import l18n from "./util/l18n";

window.onload = () => {
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
              href={"https://github.com/InCodeDevs/Editor/tree/dev-v" + version}
              target={"_blank"}
            >
              {version}
            </a>
          </li>
          <li>
            Commit:&nbsp;
            <a
              href={"https://github.com/InCodeDevs/Editor/commit/" + longCommit}
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
        </ul>
      </>
    );
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      PopupManager.disposeAll();
    }
  });

  UIManager.showComponent(<MainMenu />);
};

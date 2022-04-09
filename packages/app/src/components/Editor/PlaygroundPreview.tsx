/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import Workspace from "../../util/Workspace";
import { Compiler } from "../../../../compiler/src";
import Settings from "../../util/Settings";

export default function PlaygroundPreview() {
  useEffect(() => {
    let lastCode = "";
    const interval = setInterval(() => {
      if (Settings.getSetting("enableLiveReload") === true) {
        if (
          Workspace.getCode(false) !== "" &&
          lastCode !== Workspace.getCode(false)
        ) {
          lastCode = Workspace.getCode(false);
          Workspace.reloadLivePreview();
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <iframe
      name={"playground-preview-frame"}
      src={"about:blank"}
      width={"100%"}
      style={{
        border: "none",
        background: "#FFF",
        pointerEvents: "none",
        height: "96vh",
      }}
    />
  );
}

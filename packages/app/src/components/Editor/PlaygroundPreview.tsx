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
    <div
      style={{
        width: "50%",
        height: "96vh",
        position: "fixed",
        right: "0",
        bottom: "0",
      }}
    >
      <iframe
        name={"playground-preview-frame"}
        src={"about:blank"}
        width={window.innerWidth / 2}
        height={window.innerHeight}
        style={{
          border: "none",
          background: "#FFF",
        }}
      />
    </div>
  );
}

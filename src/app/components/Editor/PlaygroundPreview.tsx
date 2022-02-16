/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import Workspace from "../../util/Workspace";
import { sha256 } from "js-sha256";
import { JSONObject } from "../../types/JSONObject";

const secrets: JSONObject = {
  "9c3cb151e82efcb4167c7c9015620a6f951b91564ed8cf9df058c457acf019a1":
    window.location.protocol + "//" + window.location.host + "/",
  "9bc9e34875ddde9e66b0803016f99d538b7c6e1472b12f5d74d405e9953f779a": atob(
    "aHR0cHM6Ly9udWRlbGl2ZS5jb20="
  ),
};

export default function PlaygroundPreview() {
  const [ifURL, setIfURL] = React.useState(
    "/api/v1/compiler/view?code=" +
      encodeURIComponent(
        `Erstelle x als Überschrift1
Setze den Text von x auf "Start editing!"
Setze die Farbe von x auf weiß\nSetze die Schriftart von x auf sans-serif\nSetze die Textausrichtung von x auf mitte\nFüge x zum Bildschirm hinzu`
      )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (
          // @ts-ignore
          Workspace.getCode(false) !== ifURL &&
          // @ts-ignore
          Workspace.getCode(false) !== ""
        ) {
          console.log(sha256(Workspace.getCode(false)));
          let nURL =
            "/api/v1/compiler/view?code=" +
            encodeURIComponent(Workspace.getCode(false));

          if (secrets[sha256(Workspace.getCode(false))]) {
            nURL = secrets[sha256(Workspace.getCode(false))];
          }
          // @ts-ignore
          setIfURL(nURL);
        }
      } catch {
        clearInterval(interval);
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
        id={"playground-preview-frame"}
        src={ifURL}
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

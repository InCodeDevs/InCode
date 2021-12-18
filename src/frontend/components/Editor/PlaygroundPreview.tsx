/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import Workspace from "../../util/Workspace";

export default function PlaygroundPreview() {
  const [code, setCode] = React.useState(
    encodeURIComponent(
      `Erstelle x als Überschrift1
Setze den Text von x auf "Start editing!"
Setze die Farbe von x auf weiß\nSetze die Schriftart von x auf sans-serif\nSetze die Textausrichtung von x auf mitte\nFüge x zum Bildschirm hinzu`
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      if (window.editor) {
        if (
          // @ts-ignore
          Workspace.getCode(false) !== code &&
          // @ts-ignore
          Workspace.getCode(false) !== ""
        ) {
          // @ts-ignore
          setCode(encodeURIComponent(Workspace.getCode(false)));
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
        id={"playground-preview-frame"}
        src={"https://http-compiler-api.incodelang.de/view?code=" + code}
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

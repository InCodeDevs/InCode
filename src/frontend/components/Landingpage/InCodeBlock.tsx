/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { highlight } from "@incodelang/syntax-highlighting";
import { useEffect } from "react";
import String from "../../util/String";

interface Props {
  code: string;
}

export default function InCodeBlock(props: Props) {
  const id = "code-" + String.random(10);
  useEffect(() => {
    highlight(document.getElementById(id), [
      {
        name: "command",
        match: [
          /Importiere/,
          /Erstelle/,
          /Setze/,
          /Rufe/,
          /Füge/,
          /Wiederhole/,
          /Wenn/,
          /Sonst/,
          /Gib/,
          /Frage/,
          /Warte/,
        ],
        style: {
          color: "#05900d",
        },
      },
    ]);
  }, []);
  return (
    <>
      <pre>
        <code id={id}>{props.code}</code>
      </pre>
    </>
  );
}

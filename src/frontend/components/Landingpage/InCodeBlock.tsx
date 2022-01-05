/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { highlight } from "@incodelang/syntax-highlighting";
import { useEffect } from "react";
import String from "../../util/String";
import SyntaxHighlighter from "../../util/SyntaxHighlighter";

interface Props {
  code: string;
}

export default function InCodeBlock(props: Props) {
  const id = "code-" + String.random(10);
  useEffect(() => {
    SyntaxHighlighter.highlight(
      document.getElementById(id) as HTMLElement,
      SyntaxHighlighter.INCODE
    );
  }, []);
  return (
    <>
      <pre>
        <code id={id}>{props.code}</code>
      </pre>
    </>
  );
}

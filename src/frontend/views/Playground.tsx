/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import MonacoEditor from "../components/Editor/MonacoEditor";
import PlaygroundPreview from "../components/Editor/PlaygroundPreview";

export default function Playground() {
  return (
    <>
      <MonacoEditor mode={"playground"} />
      <PlaygroundPreview />
    </>
  );
}

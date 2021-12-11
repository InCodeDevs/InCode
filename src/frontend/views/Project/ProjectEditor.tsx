/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import MonacoEditor, {
  MonacoProps,
} from "../../components/Editor/MonacoEditor";
import { ProjectConfig } from "../../types/ProjectConfig";
import PlaygroundPreview from "../../components/Editor/PlaygroundPreview";
import PlaygroundMenuBar from "../../components/Editor/PlaygroundMenuBar";

interface Props {
  monaco?: MonacoProps;
  project: ProjectConfig;
}

export default function ProjectEditor(props: Props) {
  return (
    <>
      <PlaygroundMenuBar />
      {props.project.type === "code" ? (
        <MonacoEditor
          mode={props.monaco?.mode || "project"}
          code={props.monaco?.code}
        />
      ) : (
        ""
      )}
      <PlaygroundPreview />
    </>
  );
}

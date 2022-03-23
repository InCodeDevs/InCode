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
import EditorMenuBar from "../../components/Editor/EditorMenuBar";
import BlocklyEditor, {
  BlocklyProps,
} from "../../components/Editor/BlocklyEditor";
import FileSelector from "../../components/Editor/FileSelector";

interface Props {
  monaco?: MonacoProps;
  project: ProjectConfig;
  blockly?: BlocklyProps;
}

export default function ProjectEditor(props: Props) {
  let project = props.project;
  if (typeof project === "string") {
    project = JSON.parse(project);
  }
  return (
    <>
      <EditorMenuBar projectConfig={project} />
      <FileSelector />
      {project.type === "code" ? (
        <MonacoEditor
          mode={props.monaco?.mode || "project"}
          code={props.monaco?.code}
        />
      ) : (
        <BlocklyEditor initialXml={props.blockly?.initialXml || ""} />
      )}
      <PlaygroundPreview />
    </>
  );
}

ProjectEditor.displayName = "ProjectEditor";

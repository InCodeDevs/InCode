/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { useEffect } from "react";
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
import ProjectManager from "../../util/ProjectManager";
import { Registry } from "../../util/Registry";
import Workspace from "../../util/Workspace";
import Settings from "../../util/Settings";

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

  useEffect(() => {
    const i = setInterval(async () => {
      if (Settings.getSetting("autoSave") === true) {
        let p = project;
        p.code = Workspace.getCode();
        await ProjectManager.saveProject(p);
      }
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <>
      <EditorMenuBar projectConfig={project} />
      <FileSelector />
      {project.type === "code" ? (
        <MonacoEditor
          mode={props.monaco?.mode || "project"}
          code={props.monaco?.code}
          public={props.project.publicData}
        />
      ) : (
        <BlocklyEditor initialXml={props.blockly?.initialXml || ""} />
      )}
      <PlaygroundPreview />
    </>
  );
}

ProjectEditor.displayName = "ProjectEditor";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { Command } from "../../types/Command";
import UIManager from "../UIManager";
import * as React from "react";
import Settings from "../../views/Settings/Settings";
import OpenProject from "../../views/Project/OpenProject";
import Playground from "../../views/Playground";
import MainMenu from "../../views/MainMenu";
import ProjectManager from "../ProjectManager";
import ProjectEditor from "../../views/Project/ProjectEditor";

export default class CreateCommand implements Command {
  execute(args: string[]): void {
    if (args.length > 0) {
      const name = args[0];
      const type = args[1].toLowerCase();

      if (type === "code" || "blockly") {
        ProjectManager.getProjectList().then((projects) => {
          if (!projects.includes(name)) {
            ProjectManager.createProject(
              {
                name,
                code: "",
                type: type === "code" ? "code" : "blockly",
                updatedAt: new Date(),
              },
              () => {
                UIManager.showComponent(
                  <ProjectEditor
                    project={{
                      name,
                      code: "",
                      type: type === "code" ? "code" : "blockly",
                      updatedAt: new Date(),
                    }}
                  />,
                  "root"
                );
              }
            );
          }
        });
      }
    }
  }

  name: string = "create";
}

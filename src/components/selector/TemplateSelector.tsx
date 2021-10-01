/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {IObject} from "../../utils/interface/IObject";
import { UIManager } from "../../utils/UIManager";
import { ProjectManager } from "../../utils/ProjectManager";
import { SearchScreen } from "../util/SearchScreen";
import { Entry } from "../../types/SearchScreen";
import { CreateProject } from "./CrateProject";
import {Language} from "../../utils/international/Language";

export class TemplateSelector extends React.Component {
  /**
   * Renders the Menu where you can choose a template
   * @return The Menu
   */
  render() {
    const x = new XMLHttpRequest();
    x.open("GET", "/api/v1/template/data/templates.json", false);
    x.send(null);
    const templates = JSON.parse(x.responseText) as IObject;

    const entries: Entry[] = [];

    Object.keys(templates).forEach((k) => {
      const template = templates[k];
      entries.push({
        title: k,
        badge: template.verified,
        callback: () => {
          const preUse = () => {
            if (!template.verified) {
              UIManager.ask(
                "<h1 style='text-align: center'>" + Language.a("menu.attention") + "</h1>" +
                  "<h4 style='text-align: center; color: red;'>" + Language.a("template.failed.official") + "</h4>",
                () => {
                  use();
                }
              );
            } else {
              use();
            }
          };

          const use = () => {
            UIManager.prompt(
              "<h1 style='text-align: center'>" + Language.a("project.create") + "</h1>" +
                "<h4 style='text-align: center'>" + Language.a("project.create.enter.name") + "</h4>",
              (value: string) => {
                if (ProjectManager.doesProjectExist(value)) {
                  UIManager.alert(
                    "<h1 style='text-align: center; color: red'>" + Language.a("menu.failed") + "</h1>" +
                      "<h4 style='text-align: center;'>" + Language.a("project.create.failed.name.exists") + "</h4>",
                    use
                  );
                } else {
                  if (value.length < 4) {
                    UIManager.alert(
                      "<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>" + Language.a("project.create.failed.name.length") + "</h4>",
                      use
                    );
                  } else {
                    UIManager.hideAllPopups();

                    const x = new XMLHttpRequest();
                    x.open(
                      "GET",
                      template.directURL,
                      false
                    );
                    x.send(null);

                    CreateProject.createProject0(
                      value,
                      template.type,
                      atob(x.responseText)
                    );
                  }
                }
              }
            );
          };
          preUse();
        },
        area: template.type === "monaco" ? "code-templates" : "block-templates",
        imageURL:
          template.type === "monaco"
            ? "assets/code-editor.png"
            : "https://developers.google.com/blockly/images/logos/logo_only.png",
      });
    });

    SearchScreen.entries = entries;

    return (
      <>
        <SearchScreen
          title={Language.a("template.name")}
          areas={[
            {
              title: Language.a("template.use.block"),
              id: "block-templates",
            },
            {
              title: Language.a("template.use.code"),
              id: "code-templates",
            },
          ]}
          buttons={{
            mainMenu: true,
            custom: [],
          }}
        />
      </>
    );
  }
}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { ObjectDefinition, Registry } from "../../Registry";
import { UIManager } from "../../utils/UIManager";
import { ProjectManager } from "../../utils/ProjectManager";
import { SearchScreen } from "../util/SearchScreen";
import { Entry } from "../../types/SearchScreen";

export class ProjectSelector extends React.Component {
  render() {
    const entries: Entry[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      if (
        (localStorage.key(i) as string).startsWith("incode-editor.projects")
      ) {
        const j = JSON.parse(
          localStorage.getItem(localStorage.key(i) as string) as string
        );
        entries.push({
          title: j.name,
          callback: () => {
            Registry.putRegister(0x10ad, j.name);
            ProjectManager.openProject(j.name, j.type);
          },
          imageURL:
            j.type === "monaco"
              ? "assets/code-editor.png"
              : "https://developers.google.com/blockly/images/logos/logo_only.png",
          area: j.type === "monaco" ? "code-projects" : "block-projects",
          badge: false,
        });
      }
    }

    return (
      <>
        <SearchScreen
          title={"Meine Projekte"}
          areas={[
            {
              title: "Block Projekte",
              id: "block-projects",
            },
            {
              title: "Code Projekte",
              id: "code-projects",
            },
          ]}
          entries={entries}
          buttons={{
            mainMenu: true,
            custom: [
              {
                title: "Importieren",
                callback: () => this.import(),
              },
            ],
          }}
        />
      </>
    );
  }

  /**
   * Imports a project
   */
  import() {
    const element = document.createElement("input");
    element.type = "file";

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    element.onchange = () => {
      // @ts-ignore
      const file = element.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          // @ts-ignore
          const result: string = evt.target.result;

          if (
            /^[\],:{}\s]*$/.test(
              result
                .replace(/\\["\\/bfnrtu]/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            )
          ) {
            const o = JSON.parse(result);

            let pName = o.name;
            const pType = o.type;
            const pCode = o.code;

            const create = () => {
              if (pName && pType && pCode) {
                const c = () => {
                  if (ProjectManager.createProject(pName, pType, pCode)) {
                    UIManager.showComponent(<ProjectSelector />);
                    UIManager.ask(
                      "<h1 style='text-align:center;'>Erfolgreich</h1><h4 style='text-align:center;'>Das Projekt wurde erfolgreich importiert! Willst du es jetzt öffnen?</h4>",
                      () => {
                        Registry.putRegister(0x10ad, pName);
                        ProjectManager.openProject(pName, pType);
                      }
                    );
                  } else {
                    UIManager.alert(
                      "<h1 style='text-align:center; color: red;'>Fehler</h1><h4 style='text-align:center;'>Das Projekt konnte nicht importiert werden!</h4>"
                    );
                  }
                };

                if (
                  ProjectManager.doesProjectExist(pName) ||
                  pName.length < 4
                ) {
                  UIManager.prompt(
                    "<h1 style='text-align:center; color: red;'>Fehler</h1><h4 style='text-align:center;'>Der Projektname ist bereits vergeben (oder zu kurz), bitte gib einen anderen Namen ein!</h4>",
                    (value) => {
                      if (
                        ProjectManager.doesProjectExist(value) ||
                        pName.length < 4
                      ) {
                        create();
                      } else {
                        pName = value;
                        o.name = pName;
                        c();
                      }
                    }
                  );
                } else c();
              } else {
                UIManager.alert(
                  "<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei ist keine InCode Projekt Datei!</h4>"
                );
              }
            };

            create();
          } else {
            UIManager.alert(
              "<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei ist keine InCode Projekt Datei!</h4>"
            );
          }
        };

        reader.onerror = () => {
          UIManager.alert(
            "<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei konnte nicht gelesen werden!</h4>"
          );
        };
      }

      document.body.removeChild(element);
    };
  }

  public static getProjects(): ObjectDefinition {
    const projects: ObjectDefinition = {};
    for (let i = 0; i < localStorage.length; i++) {
      if (
        (localStorage.key(i) as string).startsWith("incode-editor.projects")
      ) {
        if (
          JSON.parse(
            localStorage.getItem(localStorage.key(i) as string) as string
          ).name
        ) {
          projects[
            JSON.parse(
              localStorage.getItem(localStorage.key(i) as string) as string
            ).name
          ] = JSON.parse(
            localStorage.getItem(localStorage.key(i) as string) as string
          );
        }
      }
    }
    return projects;
  }
}

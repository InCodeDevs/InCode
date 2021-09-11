/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { ObjectDefinition } from "../../Registry";
import { UIManager } from "../../utils/UIManager";
import { ProjectManager } from "../../utils/ProjectManager";
import { MainMenu } from "../MainMenu";
import { SearchScreen } from "../util/SearchScreen";
import { Entry } from "../../types/SearchScreen";

export class TemplateSelector extends React.Component {
  /**
   * Renders the Menu where you can choose a template
   * @return The Menu
   */
  render() {
    const x = new XMLHttpRequest();
    x.open(
      "GET",
      "https://templates.incode.craftions.net/templates.json",
      false
    );
    x.send(null);
    const templates = JSON.parse(x.responseText) as ObjectDefinition;

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
                "<h1 style='text-align: center'>Achtung</h1>" +
                  "<h4 style='text-align: center; color: red;'>Diese Vorlage ist nicht offiziell und funktioniert möglicherweise nicht. Willst du die Vorlage trotzdem verwenden?</h4>",
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
              "<h1 style='text-align: center'>Projekt Erstellen</h1>" +
                "<h4 style='text-align: center'>Bitte gib den Namen deines neuen Projektes ein!</h4>",
              (value: string) => {
                if (ProjectManager.doesProjectExist(value)) {
                  UIManager.alert(
                    "<h1 style='text-align: center; color: red'>Fehler</h1>" +
                      "<h4 style='text-align: center;'>Dieser Name ist bereits vergeben!</h4>",
                    use
                  );
                } else {
                  if (value.length < 4) {
                    UIManager.alert(
                      "<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>Der Name ist zu kurz! Er muss mindestens 4 Zeichen lang sein!</h4>",
                      use
                    );
                  } else {
                    UIManager.hideAllPopups();

                    const x = new XMLHttpRequest();
                    x.open(
                      "GET",
                      "https://templates.incode.craftions.net/" +
                        template.directURL,
                      false
                    );
                    x.send(null);

                    MainMenu.createProject0(
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
          title={"Vorlagen"}
          areas={[
            {
              title: "Block Vorlagen",
              id: "block-templates",
            },
            {
              title: "Code Vorlagen",
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

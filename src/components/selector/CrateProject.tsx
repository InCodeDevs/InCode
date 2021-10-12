/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Registry } from "../../utils/Registry";
import { UIManager } from "../../utils/UIManager";
import { TemplateSelector } from "./TemplateSelector";
import { ProjectManager } from "../../utils/ProjectManager";
import { EditorSelector } from "./EditorSelector";
import { ProjectTypeSelector } from "./ProjectTypeSelector";
import { Language } from "../../utils/international/Language";

export class CreateProject extends React.Component {
  public static createProject() {
    UIManager.prompt(
      "<h1 style='text-align: center'>" +
        Language.a("project.create") +
        "</h1>" +
        "<h4 style='text-align: center'>" +
        Language.a("project.create.enter.name") +
        "</h4>",
      (value: string) => {
        if (ProjectManager.doesProjectExist(value)) {
          UIManager.alert(
            "<h1 style='text-align: center; color: red'>" +
              Language.a("menu.failed") +
              "</h1>" +
              "<h4 style='text-align: center;'>" +
              Language.a("project.create.failed.name.exists") +
              "</h4>",
            CreateProject.createProject
          );
        } else {
          if (value.length < 4) {
            UIManager.alert(
              "<h1 style='text-align: center; color: red'>" +
                Language.a("menu.failed") +
                "</h1>" +
                "<h4 style='text-align: center;'>" +
                Language.a("project.create.failed.name.length") +
                "</h4>",
              CreateProject.createProject
            );
          } else {
            UIManager.hideAllPopups();
            Registry.putRegister(0x10ad, value);
            Registry.putRegister(0x10af, CreateProject.createProject0);
            UIManager.showComponent(<EditorSelector />);
          }
        }
      }
    );
  }

  public static createProject0(name: string, type: string, code = "") {
    if (type === "blockly" && code === "")
      code =
        '<xml><block type="start" id="|(^9%DCME)E4UEoWv~G]" x="134" y="70"></block></xml>';

    Registry.putRegister(0x10ad, name);
    Registry.putRegister(0x10aa, type);
    Registry.putRegister(0x10ab, code);
    Registry.putRegister(0x10af, CreateProject.createProject1);
    UIManager.showComponent(<ProjectTypeSelector />);
  }

  public static createProject1(env: string) {
    ProjectManager.createProject(
      Registry.getRegister(0x10ad),
      Registry.getRegister(0x10aa),
      Registry.getRegister(0x10ab),
      env
    );
    UIManager.hideMenu();
    UIManager.showMenuBar();
    ProjectManager.openProject(
      Registry.getRegister(0x10ad),
      Registry.getRegister(0x10aa)
    );
  }

  render() {
    return (
      <>
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#F8F9FAFF" }}>{Language.a("project.create")}</h1>
          <div className={"menu-choose-editors-root"}>
            <div className={"menu-choose-editors-root"}>
              <div
                className={"menu-choose-editor"}
                onClick={CreateProject.createProject}
              >
                <img
                  src={"assets/editor-create-project.png"}
                  width={128}
                  height={128}
                />
                <p className={"menu-editor-description"}>
                  {Language.a("project.create")}
                </p>
              </div>
              <div
                className={"menu-choose-editor"}
                onClick={() => {
                  UIManager.showComponent(<TemplateSelector />);
                }}
              >
                <img
                  src={"assets/editor-create-project.png"}
                  width={128}
                  height={128}
                />
                <p className={"menu-editor-description"}>
                  {Language.a("project.create.template")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { UIManager } from "../utils/UIManager";
import { Workspace } from "../utils/Workspace";
import { MainMenu } from "./MainMenu";
import {Language} from "../utils/international/Language";

export class MenuBar extends React.Component {
  /**
   * Renders the Menu Bar
   * @return The Menu Bar
   */
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            top: "50%",
            left: "50%",
            position: "relative",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div style={{ flex: "33%", textAlign: "center", display: "flex" }}>
            <Dropdown
              style={{ flex: "50%", textAlign: "center" }}
              id={"projectButton"}
            >
              <Dropdown.Toggle variant="outline-flat" size={"xxl"}>
                {Language.a("menubar.project")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={Workspace.save}>
                  {Language.a("menubar.save")}
                </Dropdown.Item>
                <Dropdown.Item onClick={Workspace.saveProjectFile}>
                  {Language.a("menubar.save.file")}
                </Dropdown.Item>
                <Dropdown.Item onClick={Workspace.export}>
                  {Language.a("menubar.export")}
                </Dropdown.Item>
                <Dropdown.Item onClick={Workspace.deployAccount}>
                  {Language.a("menubar.save.account")}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Workspace.rename}>
                  {Language.a("menubar.change.name")}
                </Dropdown.Item>
                <Dropdown.Item onClick={Workspace.changeEnvType}>
                  {Language.a("menubar.change.type")}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Workspace.deployProject}>
                  {Language.a("menubar.deploy.project")}
                </Dropdown.Item>
                <Dropdown.Item onClick={Workspace.deployTemplate}>
                  {Language.a("menubar.deploy.template")}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Workspace.delete}>
                  {Language.a("menubar.delete")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div
              style={{ flex: "50%", textAlign: "center" }}
              id={"rl-preview-btn"}
            >
              <Button
                id={"previewButton"}
                variant={"outline-flat"}
                size={"xxl"}
                onClick={Workspace.preview}
              >
                {Language.a("menubar.preview")}
              </Button>
              ;
            </div>
          </div>
          <div style={{ flex: "33%" }}>
            <h1 style={{ color: "#F8F9FAFF", textAlign: "center" }}>
              <div style={{ textAlign: "center" }}>{Language.a("product.name")}</div>
            </h1>
          </div>
          <div style={{ flex: "25%", textAlign: "center" }}>
            <Button
              variant={"outline-flat"}
              size={"xxl"}
              onClick={this.showMainMenu}
            >
              {Language.a("menu.main")}
            </Button>
          </div>
        </div>
      </>
    );
  }

  /**
   * Shows the Main Menu
   */
  showMainMenu() {
    Workspace.save(false);
    if (document.getElementById("livePreviewFrame") != undefined) {
      (document.getElementById("livePreview") as HTMLDivElement).removeChild(
        document.getElementById("livePreviewFrame") as HTMLIFrameElement
      );
    }
    UIManager.deleteBlockly();
    UIManager.deleteMonaco();
    UIManager.showComponent(<MainMenu />);
    UIManager.hideMenuBar();
  }
}

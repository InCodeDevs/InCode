/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { UIManager } from "../utils/UIManager";
import { GameMenu } from "./game/GameMenu";
import { Settings } from "./Settings";
import { ProjectSelector } from "./selector/ProjectSelector";
import { SelectLoginOption } from "./login/SelectLoginOption";
import { UserUtil } from "../utils/UserUtil";
import { CreateProject } from "./selector/CrateProject";
import { Language } from "../utils/international/Language";
import { Dashboard } from "./login/Dashboard";
import { Registry } from "../utils/Registry";

export class MainMenu extends React.Component {
  /**
   * Opens a Project
   */
  public static openProject() {
    UIManager.showComponent(<ProjectSelector />);
  }

  public static openSettings() {
    UIManager.showComponent(<Settings />);
  }

  public static openDocumentation() {
    window.open("https://docs.incodelang.de/docs/intro", "_blank");
  }

  public static openTutorials() {
    window.open("https://docs.incodelang.de/docs/Tutorials/Tutorials");
  }

  public static openGame() {
    UIManager.showComponent(<GameMenu />);
  }

  public static checkLogin() {
    Registry.putRegister(0x10af, () => {
      if (Registry.getRegister(0x10ba)) {
        UIManager.showComponent(Registry.getRegister(0x10ba));
        Registry.deleteRegister(0x10ba);
      } else {
        UIManager.showComponent(<MainMenu />);
      }
    });

    // @ts-ignore
    if (UserUtil.getSavedUser().username && UserUtil.getSavedUser().password) {
      UIManager.showComponent(<Dashboard />);
    } else {
      UIManager.showComponent(<SelectLoginOption />);
    }
  }

  /**
   * Renders the Main Menu
   * @return The Menu
   */
  render() {
    return (
      <>
        <div id="userIndicator" onClick={MainMenu.checkLogin}>
          <div id="userImage">
            <img
              src="assets/icon-5355896_640.png"
              id={"userIndicatorPicture"}
            />
            <div id={"userIndicatorAs"}>
              {JSON.parse(
                sessionStorage.getItem("accounts.actualAccount") as string
              ).username || Language.a("menu.account.login")}
            </div>
          </div>
        </div>
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#F8F9FAFF" }}>{Language.a("product.name")}</h1>
          <div className={"menu-choose-editors-root"}>
            <div
              className={"menu-choose-editor"}
              onClick={() => UIManager.showComponent(<CreateProject />)}
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
              onClick={MainMenu.openProject}
            >
              <img
                src={"assets/editor-open-project.png"}
                width={128}
                height={128}
              />
              <p className={"menu-editor-description"}>
                {Language.a("project.open")}
              </p>
            </div>
            <div
              className={"menu-choose-editor"}
              onClick={MainMenu.openSettings}
            >
              <img src={"assets/settings.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                {Language.a("settings.name")}
              </p>
            </div>
          </div>
          <h1 style={{ color: "#F8F9FAFF" }}>{Language.a("menu.howto")}</h1>
          <div className={"menu-choose-editors-root"}>
            <div className={"menu-choose-editor"} onClick={MainMenu.openGame}>
              <img src={"assets/play.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                {Language.a("videos.name")}
              </p>
            </div>
            <div
              className={"menu-choose-editor"}
              onClick={MainMenu.openTutorials}
            >
              <img src={"assets/tutorials.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                {Language.a("tutorials.name")}
              </p>
            </div>
            <div
              className={"menu-choose-editor"}
              onClick={MainMenu.openDocumentation}
            >
              <img src={"assets/documentation.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                {Language.a("documentation.name")}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

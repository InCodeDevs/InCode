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
import {Language} from "../utils/international/Language";

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
    // @ts-ignore
    if (UserUtil.getSavedUser().username && UserUtil.getSavedUser().password) {
      UIManager.ask(
        "<h1>Abmelden?</h1><h4>Willst du dich wirklich abmelden?</h4>",
        () => {
          sessionStorage.removeItem("accounts.actualAccount");

          for (let i = 0; i < localStorage.length; i++) {
            const localStorageKey = localStorage.key(i) as string;
            if (localStorageKey.startsWith("incode-editor.projects")) {
              if (
                JSON.parse(localStorage.getItem(localStorageKey) as string)
                  .save === "cloud"
              ) {
                localStorage.removeItem(localStorageKey);
              }
            }
          }

          window.location.reload();
        }
      );
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
              src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-mann-profil-gesch%C3%A4ftsmann-avatar-person-glyph-vektor-illustration.jpg"
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
          <h1 style={{ color: "#F8F9FAFF" }}>
            {Language.a("product.name")}
          </h1>
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
          <h1 style={{ color: "#F8F9FAFF" }}>
            {Language.a("menu.howto")}
          </h1>
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

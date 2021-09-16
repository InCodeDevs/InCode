/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Registry } from "../../utils/Registry";
import { UIManager } from "../../utils/UIManager";
import {Language} from "../../utils/international/Language";

export class ProjectTypeSelector extends React.Component {
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
          <h1 style={{ color: "#F8F9FAFF" }}>{Language.a("project.type.name")}</h1>
          <div className={"menu-choose-editors-root"}>
            <div className={"menu-choose-editor"} onClick={this.useWebsite}>
              <img src={"/assets/website.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                Website <br />
                <span style={{ fontFamily: "Comic Sans MS" }}>
                  {Language.a("project.type.website")}
                </span>
              </p>
            </div>
            <div
              className={"menu-choose-editor"}
              onClick={this.useStyledWebsite}
            >
              <img src={"/assets/website.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                Styled Website <br />
                <span style={{ fontFamily: "Comic Sans MS" }}>
                  {Language.a("project.type.website.styled")}
                </span>
              </p>
            </div>
            <div className={"menu-choose-editor"} onClick={this.useDesktop}>
              <img src={"/assets/desktop.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                Desktop App <br />
                <span style={{ fontFamily: "Comic Sans MS" }}>
                  {Language.a("project.type.desktop")}
                </span>
              </p>
            </div>
          </div>
          <div className={"menu-choose-editors-root"}>
            <div
              className={"menu-choose-editor"}
              onClick={this.useStyledDesktop}
            >
              <img src={"/assets/desktop.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                Styled Desktop App <br />
                <span style={{ fontFamily: "Comic Sans MS" }}>
                  {Language.a("project.type.desktop.styled")}
                </span>
              </p>
            </div>
            <div className={"menu-choose-editor"} onClick={this.useGame}>
              <img src={"/assets/game.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                Game <br />
                <span style={{ fontFamily: "Comic Sans MS" }}>
                  {Language.a("project.type.game")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  useWebsite() {
    Registry.getRegister(0x10af)("website");
  }

  useStyledWebsite() {
    Registry.getRegister(0x10af)("styled-website");
  }

  useDesktop() {
    Registry.getRegister(0x10af)("desktop");
  }

  useStyledDesktop() {
    Registry.getRegister(0x10af)("styled-desktop");
  }

  useGame() {
    UIManager.alert(
      "<h1 style='text-align: center'>" + Language.a("menu.attention") + "</h1>" +
        "<h4 style='text-align:center;'>" + Language.a("menu.working") + "</h4>"
    );
  }
}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Registry } from "../../utils/Registry";
import {Language} from "../../utils/international/Language";

export class EditorSelector extends React.Component {
  /**
   * Renders the Menu where the user can choose his favorite editor. (may be removed in feature versions)
   * @return The Menu
   */
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
          <h1 style={{ color: "#F8F9FAFF" }}>{Language.a("editor.select.name")}</h1>
          <h5 style={{ color: "#F8F9FAFF" }}>
            {
              Language.a("editor.select.info").replace("%1", Registry.getRegister(0x10AD))
            }
          </h5>
          <div className={"menu-choose-editors-root"}>
            <div className={"menu-choose-editor"} onClick={this.selectBlockly}>
              <img
                src={
                  "https://developers.google.com/blockly/images/logos/logo_only.png"
                }
                width={128}
                height={128}
              />
              <p className={"menu-editor-description"}>
                {
                  Language.a("editor.block.name")
                }
              </p>
            </div>
            <div className={"menu-choose-editor"} onClick={this.selectMonaco}>
              <img src={"assets/code-editor.png"} width={128} height={128} />
              <p className={"menu-editor-description"}>
                {
                  Language.a("editor.code.name")
                }
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  /**
   * Opens the blockly editor
   */
  selectBlockly() {
    Registry.getRegister(0x10af)(Registry.getRegister(0x10ad), "blockly", "");
  }

  /**
   * Opens the monaco (vscode) editor
   */
  selectMonaco() {
    Registry.getRegister(0x10af)(Registry.getRegister(0x10ad), "monaco", "");
  }
}

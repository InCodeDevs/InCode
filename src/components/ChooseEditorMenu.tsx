/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../Options";

import {UIManager} from "../utils/UIManager";

export class ChooseEditorMenu extends React.Component {

    /**
     * Renders the Menu where the user can choose his favorite editor. (may be removed in feature versions)
     * @return The Menu
     */
    render() {
        return (
            <>
                <div style={{
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%, -50%)',
                    position: "absolute",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#F8F9FAFF"}}>Editor auswählen</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.openBlockEditor}>
                            <img
                                src={"https://developers.google.com/blockly/images/logos/logo_only.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Block <br /> Editor
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.openMonaco}>
                            <img
                                src={"https://developers.google.com/blockly/images/logos/logo_only.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Code <br /> Editor
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    /**
     * Opens the blockly editor
     */
    openBlockEditor() {
        UIManager.hideMenu();
        UIManager.showMenuBar();
        UIManager.createBlockly();
    }

    /**
     * Opens the monaco (vscode) editor
     */
    openMonaco() {
        UIManager.hideMenu();
        UIManager.showMenuBar()
        UIManager.createMonaco()
    }
}

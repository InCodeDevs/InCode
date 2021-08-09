/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../Options";
import { TempOptions } from "../TempOptions";

import {UIManager} from "../utils/UIManager";
import {ProjectManager} from "../utils/ProjectManager";

export class EditorSelector extends React.Component {

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
                    <h5 style={{color: "#F8F9FAFF"}}>Das Projekt "{TempOptions.options[0x10AD]}" wird mit dem ausgewählten Editor geöffnet. Du kannst jederzeit den Editor wieder wechseln.</h5>
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
                                src={"assets/code-editor.png"} width={128}
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
        UIManager.alert("<h1 style='text-align: center'>Fehler</h1>" +
            "<h4 style='text-align: center; color: red'>Der Block Editor ist momentan nicht verfügbar!</h4>",
            () => {
            ProjectManager.openProject(TempOptions.options[0x10AD], "monaco");
        })
        // ProjectManager.openProject(TempOptions.options[0x10AD], "blockly")
    }

    /**
     * Opens the monaco (vscode) editor
     */
    openMonaco() {
        ProjectManager.openProject(TempOptions.options[0x10AD], "monaco")
    }
}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../Options";
import { TempOptions } from "../TempOptions";

import {UIManager} from "../utils/UIManager";
import {ProjectManager} from "../utils/ProjectManager";
import {MainMenu} from "./MainMenu";

export class TemplateSelector extends React.Component {

    /**
     * Renders the Menu where you can choose a template
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
                    <h1 style={{color: "#F8F9FAFF"}}>Vorlage auswählen</h1>
                    <h5 style={{color: "#F8F9FAFF"}}>Das Projekt "{TempOptions.options[0x10AD] || "project.name"}" wird mit dem ausgewählter Vorlage erstellt. <br /><span style={{color: "red"}}>ACHTUNG: </span>Du kannst die Vorlage nicht mehr ändern.</h5>
                    <div className={"template-root"}>
                        <div className={"template"}>
                            <img
                                src={"assets/code-editor.png"} width={128}
                                height={128}/>
                            <p className={"template-description"}>
                                Test <br />
                            </p>
                            <p className={"template-for"}>
                                <b>Für: </b> Code Editor
                            </p>
                        </div>
                        <div className={"template"}>
                            <img
                                src={"assets/code-editor.png"} width={128}
                                height={128}/>
                            <p className={"template-description"}>
                                Test <br />
                            </p>
                            <p className={"template-for"}>
                                <b>Für: </b> Code Editor
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {ProjectManager} from "../utils/ProjectManager";
import {UIManager} from "../utils/UIManager";
import {TempOptions} from "../TempOptions";

export class MainMenu extends React.Component {

    /**
     * Renders the Main Menu
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
                    <h1 style={{color: "#F8F9FAFF"}}>InCode Editor</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={MainMenu.createNewProject}>
                            <img
                                src={"assets/editor-create-project.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Projekt <br/> Erstellen
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={MainMenu.openProject}>
                            <img
                                src={"assets/editor-open-project.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Projekt <br/> Öffnen
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    /**
     * Opens a Project
     */
    public static openProject() {
        UIManager.prompt(
            "<h1 style='text-align: center'>Projekt Öffnen</h1>" +
            "<h4 style='text-align: center'>Bitte gib den Namen deines bestehenden Projektes ein!</h4>",
            (value: string) => {
                if (!ProjectManager.doesProjectExist(value)) {
                    UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>Ein Projekt mit diesem Namen konnte nicht gefunden werden!</h4>", MainMenu.openProject);
                }else {
                    MainMenu.openProject0(value)
                }
            }
        )
    }

    /**
     * Creates a new Project
     */
    public static createNewProject() {
        UIManager.prompt(
            "<h1 style='text-align: center'>Projekt Erstellen</h1>" +
            "<h4 style='text-align: center'>Bitte gib den Namen deines neuen Projektes ein!</h4>",
            (value: string) => {
                if (ProjectManager.createProject(value)) {
                    MainMenu.openProject0(value)
                    // ProjectManager.openProject(value)
                } else {
                    UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>Dieser Name ist bereits vergeben!</h4>", MainMenu.createNewProject);
                }
            }
        )
    }

    private static openProject0(value: string){
        // 0x10AD is the internal identifier of the temporary project name address in the TempOptions.options array
        TempOptions.options[0x10AD] = value;
        UIManager.hideMenu();
        UIManager.showEditorSelector();
    }
}

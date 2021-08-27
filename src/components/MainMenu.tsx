/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {ProjectManager} from "../utils/ProjectManager";
import {UIManager} from "../utils/UIManager";
import {Registry} from "../Registry";
import {MenuBar} from "./MenuBar";
import {GameMenu} from "./game/GameMenu";
import {Settings} from "./Settings";
import {ProjectTypeSelector} from "./selector/ProjectTypeSelector";
import {EditorSelector} from "./selector/EditorSelector";
import {TemplateSelector} from "./selector/TemplateSelector";
import {ProjectSelector} from "./selector/ProjectSelector";

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
                        <div className={"menu-choose-editor"} onClick={() => {
                            UIManager.showComponent(<TemplateSelector />);
                        }}>
                            <img
                                src={"assets/editor-create-project.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Projekt <br/> mit Vorlage Erstellen
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
                        <div className={"menu-choose-editor"} onClick={MainMenu.openSettings}>
                            <img
                                src={"assets/settings.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Einstellungen
                            </p>
                        </div>
                    </div>
                    <h1 style={{color: "#F8F9FAFF"}}>How to InCode</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={MainMenu.openGame}>
                            <img
                                src={"assets/play.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Lernen
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={MainMenu.openTutorials}>
                            <img
                                src={"assets/tutorials.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Tutorials
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={MainMenu.openDocumentation}>
                            <img
                                src={"assets/documentation.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Dokumentation
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
        UIManager.showComponent(<ProjectSelector/>)
    }

    /**
     * Creates a new Project
     */
    public static createNewProject() {
        UIManager.prompt(
            "<h1 style='text-align: center'>Projekt Erstellen</h1>" +
            "<h4 style='text-align: center'>Bitte gib den Namen deines neuen Projektes ein!</h4>",
            (value: string) => {
                if (ProjectManager.doesProjectExist(value)) {
                    UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>Dieser Name ist bereits vergeben!</h4>", MainMenu.createNewProject);
                } else {
                    if (value.length < 4) {
                        UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                            "<h4 style='text-align: center;'>Der Name ist zu kurz! Er muss mindestens 4 Zeichen lang sein!</h4>", MainMenu.createNewProject)
                    } else {
                        UIManager.hideAllPopups();
                        Registry.putRegister(0x10AD, value);
                        Registry.putRegister(0x10AF, MainMenu.createProject0)
                        UIManager.showComponent(<EditorSelector/>)
                    }
                }
            }
        )
    }

    public static createProject0(name: string, type: string, code: string = "") {
        if (type === 'blockly' && code === '')
            code = '<xml><block type=\"start\" id=\"|(^9%DCME)E4UEoWv~G]\" x=\"134\" y=\"70\"></block></xml>'

        Registry.putRegister(0x10AD, name);
        Registry.putRegister(0x10AA, type);
        Registry.putRegister(0x10AB, code);
        Registry.putRegister(0x10AF, MainMenu.createProject1);
        UIManager.showComponent(<ProjectTypeSelector/>);
    }

    public static createProject1(env: string) {
        ProjectManager.createProject(
            Registry.getRegister(0x10AD),
            Registry.getRegister(0x10AA),
            Registry.getRegister(0x10AB),
            env
        )
        UIManager.hideMenu();
        UIManager.showMenuBar();
        ProjectManager.openProject(Registry.getRegister(0x10AD), Registry.getRegister(0x10AA));
    }

    public static openSettings() {
        UIManager.showComponent(<Settings/>);
    }

    public static openDocumentation() {
        window.open("https://incode.craftions.net/docs/intro", "_blank")
    }

    public static openTutorials() {
        window.open("https://incode.craftions.net/docs/Tutorials/Tutorials");
    }

    public static openGame() {

        // Only for debugging!
        // We should remove this later.

        UIManager.alert("<h1>In Arbeit</h1><h4>Diese Funktion ist aktuell in Arbeit und kann Fehler enthalten.</h4>", () => {
            UIManager.showComponent(<GameMenu />);
        })

    }
}

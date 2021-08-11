/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {BlocklyCompiler} from "../blockly/BlocklyCompiler";
import * as WebCompiler from "../incode/compiler/WebCompiler";
import {Options} from "../Options";
import {Networking} from "./Networking";
import {TempOptions} from "../TempOptions";
import {ProjectManager} from "./ProjectManager";
import {UIManager} from "./UIManager";
import * as Blockly from "blockly/blockly";

export class Workspace {

    /**
     * Compiles the current Workspace
     * @param dl If this is true the output will be downloaded as "Programm.js"
     */
    public static compile(dl: boolean = true) {
        let code = ""
        if (Options.currentEditor != '') {
            if (Options.currentEditor === 'vscode') {
                // @ts-ignore
                code = window.editor.getValue();
            } else {
                code = new BlocklyCompiler().compile();
            }

            console.log("Code: \n\n" + code)

            code = WebCompiler.WebCompiler.compile(code);

            Options.currentLiveJS = btoa(code);

            console.log(Options.currentLiveJS)

            if (dl) {
                Networking.download("Programm.js", code)
            }
        }
    }

    /**
     * Compiles the code and opens it in the preview window
     */
    public static preview = () => {
        if (Options.currentEditor != '' && Options.enableLivePreview) {
            Workspace.compile(false);
            if (document.getElementById('livePreviewFrame') != undefined) {
                (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
            }
            let previewFrame = document.createElement('iframe');
            previewFrame.src = 'preview.html?code=' + Options.currentLiveJS;
            previewFrame.id = 'livePreviewFrame';
            (document.getElementById('livePreview') as HTMLDivElement).appendChild(previewFrame);
        }
    }

    /**
     * Saves the current Workspace
     */
    public static save(showSucceedMessage: boolean = true) {
        ProjectManager.saveProject(TempOptions.options[0x10AD], Workspace.getWorkspaceCode()); // 0x10AD => magic value
        if (showSucceedMessage)
            UIManager.alert("<h1 style='text-align: center;'>Erfolgreich</h1><h4 style='text-align: center; color: limegreen'>Das Projekt wurde gespeichert!</h4>")
    }

    /**
     * Deletes the Project associated to the current Workspace
     */
    public static delete() {
        UIManager.ask("<h1 style='text-align: center'>Fortfahren?</h1>" +
            "<h4>Willst du dein Projekt wirklich löschen <span style='color: red'>(Dies kann nicht rückgängig gemacht werden</span></h4>",
            () => {
                UIManager.hideMenuBar();
                UIManager.showMainMenu();
                UIManager.deleteBlockly();
                UIManager.deleteMonaco();
                ProjectManager.deleteProject(TempOptions.options[0x10AD]);
            }
        );
    }

    /**
     * Changes the name of the Projects associated to the current Workspace
     */
    public static rename() {
        Workspace.save(false)
        UIManager.prompt("<h1 style='text-align: center;'>Projekt Umbenennen</h1>" +
            "<h4 style='text-align: center'>Bitte gib den neuen Namen für dein Projekt ein</h4>",
            (value: string) => {
                ProjectManager.renameProject(TempOptions.options[0x10AD], value, Workspace.getWorkspaceCode())
                TempOptions.options[0x10AD] = value; // 0x10AD -> magic value :)
            }
        );
    }

    /**
     * Returns the Code of the current Workspace
     * @return The code
     */
    public static getWorkspaceCode(): string {
        let code = "";
        if ((document.getElementById("monaco") as HTMLDivElement).style.display != "none") {
            // @ts-ignore
            code = window.editor.getValue();
        } else {
            code = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).outerHTML;
        }
        return code;
    }

    /**
     * Deploys the current Workspace to the template registry
     */
    public static deploy() {
        UIManager.ask(
            "<h1 style='text-align: center'>Veröffentlichen</h1>" +
            "<h4 style='text-align: center;'>Wenn du dein Template veröffentlichsts, kann jeder auf dieses nutzen." +
            "<span style='color: red'>Die Veröffentlichung kann nicht rückgängig gemacht werden.</span>" +
            "</h4>",
            () => {
                let x: XMLHttpRequest = new XMLHttpRequest();
                let c = Workspace.getWorkspaceCode();
                x.open("GET", "https://templates.incode.craftions.net/api/upload?name="
                    + TempOptions.options[0x10AD]
                    + "&type="
                    + ProjectManager.getProjectType(TempOptions.options[0x10AD])
                    + "&code="
                    + btoa(c),
                    false);
                x.send(null)
                if (x.responseText === "Successful") {
                    UIManager.alert(
                        "<h1 style='text-align: center'>Erfolgreich</h1>" +
                        "<h4 style='text-align: center;'>Deine Vorlage wurde soeben veröffentlicht!</h4>"
                    )
                } else {
                    UIManager.alert(
                        "<h1 style='text-align: center; color: red'>Fehler</h1>" +
                        "<h4 style='text-align: center;'>Dieser Name ist bereits vorhanden! Ändere den Namen deines Projektes und versuche es erneut!</h4>"
                    )
                }
            }
        )
    }
}

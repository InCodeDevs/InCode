/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {BlocklyCompiler} from "../blockly/BlocklyCompiler";
import * as WebCompiler from "../incode/compiler/WebCompiler";
import {Options} from "../Options";
import {Networking} from "./Networking";
import {Registry} from "../Registry";
import {ProjectManager} from "./ProjectManager";
import {UIManager} from "./UIManager";
import * as Blockly from "blockly/blockly";
import * as JSZip from 'jszip';

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
            if(ProjectManager.getProjectEnv(Registry.getRegister(0x10AD)).includes("styled")){
                Options.currentLiveJS = btoa(
                    "let incode_style_tag = document.createElement('link'); incode_style_tag.type = 'text/css'; incode_style_tag.rel = 'stylesheet'; incode_style_tag.href = \"https://incode-cdn.craftions.net/export/incode.css\"; document.head.appendChild(incode_style_tag);"
                    + atob(Options.currentLiveJS)
                )
            }
            console.log(atob(Options.currentLiveJS))
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
        ProjectManager.saveProject(Registry.getRegister(0x10AD), Workspace.getWorkspaceCode()); // 0x10AD => magic value
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
                if(document.getElementById('livePreviewFrame') != undefined){
                    (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
                }
                UIManager.deleteBlockly();
                UIManager.deleteMonaco();
                UIManager.hideMenuBar();
                UIManager.showMainMenu();
                ProjectManager.deleteProject(Registry.getRegister(0x10AD));
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
                ProjectManager.renameProject(Registry.getRegister(0x10AD), value, Workspace.getWorkspaceCode())
                Registry.putRegister(0x10AD, value);
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
                    + Registry.getRegister(0x10AD)
                    + "&type="
                    + ProjectManager.getProjectType(Registry.getRegister(0x10AD))
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

    /**
     * Exports the current workspace
     */
    public static export() {

        Workspace.compile(false)
        let code = atob(Options.currentLiveJS);

        let incode = "";
        if (Options.currentEditor === 'vscode') {
            // @ts-ignore
            incode = window.editor.getValue();
        } else {
            incode = new BlocklyCompiler().compile();
        }

        switch (ProjectManager.getProjectEnv(Registry.getRegister(0x10AD))){
            case "website":
                Workspace.exportFinal(code, incode);
                break;
            case "styled-website":
                Workspace.exportFinal(code, incode, true);
                break;
            case "desktop":
                Workspace.exportFinalDesktop(code)
                break;
            case "styled-desktop":
                Workspace.exportFinalDesktop(code, true)
                break;
            case "game":
                Workspace.exportFinal(code, incode, false, true)
                break;
            default:
                Workspace.exportFinal(code, incode)
                break;
        }
    }

    public static exportFinalDesktop(code: string, styled: boolean = false) {
        let zipFile = new JSZip();

        zipFile.folder("scripts");
        zipFile.folder("resources");

        zipFile.file("exporter.bat", Networking.getURLContent("https://incode-cdn.craftions.net/export/exporter/exporter.bat").replace("PROJECT_NAME=Pupsi", "PROJECT_NAME=" + Registry.getRegister(0x10AD)))
        zipFile.file("scripts/updateApp.js", Networking.getURLContent("https://incode-cdn.craftions.net/export/exporter/scripts/updateApp.js"))

        let inCodeCSS = "";

        if(styled) {
            let inCodeStyleSheet = Networking.getURLContent("https://incode-cdn.craftions.net/export/incode.css");

            zipFile.file("resources/incode.css", inCodeStyleSheet + "\n");
            inCodeCSS = "\n<link rel='stylesheet' type='text/css' href='incode.css'>\n";
        }

        zipFile.file("resources/index.js", Networking.getURLContent("https://incode-cdn.craftions.net/export/exporter/default/index.js"))

        zipFile.file("resources/index.html", `
            <!DOCTYPE html>
            <html lang="de">
                <head>
                    <title>${Registry.getRegister(0x10AD)}</title>
                    <script defer src="${Registry.getRegister(0x10AD)}.js"></script>${inCodeCSS}
                </head>
                <body></body>
            </html>
        ` + "\n");

        zipFile.file("resources/" + Registry.getRegister(0x10AD) + ".js", code);

        zipFile.generateAsync(
            {
                type: 'base64',
                compressionOptions: {
                    level: 6
                }
            }).then((content) => {
            Networking.downloadCustom("data:application/zip; base64," + content, Registry.getRegister(0x10AD) + ".zip")
        })
    }

    public static exportFinal(code: string, inCode: string, styled: boolean = false, game: boolean = false) {
        let zipFile = new JSZip();
        zipFile.file(Registry.getRegister(0x10AD) + ".js", code + "\n" );
        zipFile.file(Registry.getRegister(0x10AD) + ".ic", inCode + "\n" );

        let inCodeCSS = "";
        let inCodeJS = "";

        if(styled) {
            let inCodeStyleSheet = Networking.getURLContent("https://incode-cdn.craftions.net/export/incode.css");

            zipFile.file("incode.css", inCodeStyleSheet + "\n");
            inCodeCSS = "\n<link rel='stylesheet' type='text/css' href='incode.css'>\n";
        }

        if(game) {
            let inCodeScript = Networking.getURLContent("https://incode-cdn.craftions.net/export/incode.js");

            zipFile.file("incode.js", inCodeScript + "\n");
            inCodeJS = "\n<script defer src='incode.js'></script>\n";
        }

        zipFile.file("index.html", `
            <!DOCTYPE html>
            <html lang="de">
                <head>
                    <title>${Registry.getRegister(0x10AD)}</title>
                    <script defer src="${Registry.getRegister(0x10AD)}.js"></script>${inCodeCSS}${inCodeJS}
                </head>
                <body></body>
            </html>
        ` + "\n");
        zipFile.file("Ließ mich.txt",
            "Vielen Dank, dass du den offiziellen InCode Editor benutzt!\n" +
            "\n" +
            "Dein exportiertes Programm findest du in der Datei \"index.html\".\n" +
            "Außerdem findest du in der .ic Datei deinen geschriebenen InCode und in der .js\n" +
            "Datei den dazu gehörigen JavaScript Code!\n" +
            "\n" +
            "Wir wünschen dir weiterhin noch viel Spaß mit InCode.\n" +
            "\n" +
            "Das InCode Team"
        )
        zipFile.file(Registry.getRegister(0x10AD) + ".json", localStorage.getItem("incode-editor.projects." + Registry.getRegister(0x10AD)) as string)

        zipFile.generateAsync(
            {
                type: 'base64',
                compressionOptions: {
                    level: 6
                }
            }).then((content) => {
            Networking.downloadCustom("data:application/zip; base64," + content, Registry.getRegister(0x10AD) + ".zip")
        })
    }

    public static saveProjectFile() {
        Workspace.save(false);
        Networking.download(Registry.getRegister(0x10AD) + ".json", localStorage.getItem("incode-editor.projects." + Registry.getRegister(0x10AD)) as string, "application/json");
    }

    public static changeEnvType() {
        Workspace.save(false);
        if(document.getElementById('livePreviewFrame') != undefined){
            (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
        }
        UIManager.hideMenuBar();
        UIManager.deleteMonaco();
        UIManager.deleteBlockly();
        Registry.putRegister(0x10AF, (env: string) => {
            ProjectManager.setProjectEnv(Registry.getRegister(0x10AD), env);
            ProjectManager.openProject(Registry.getRegister(0x10AD), ProjectManager.getProjectType(Registry.getRegister(0x10AD)))
        });
        UIManager.showEnvSelector();
    }
}

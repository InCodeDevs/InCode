/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {ObjectDefinition, TempOptions} from "../TempOptions";
import {UIManager} from "../utils/UIManager";
import {ProjectManager} from "../utils/ProjectManager";
import {Workspace} from "../utils/Workspace";

export class ProjectSelector extends React.Component {

    /**
     * Renders the Menu where you can choose a template
     * @return The Menu
     */
    render() {
        return (
            <>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: "100%", marginTop: "2%", marginBottom: "2%"}}>
                        <h1 style={{color: "#F8F9FAFF", flex: "55%", textAlign: "right"}}>Meine Projekte</h1>
                        <div style={{flex: "45%", display: "flex"}}>
                            <span style={{flex: "50%"}}/>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"} onClick={this.import}>Importieren</Button>
                            </div>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"}
                                        onClick={this.showMainMenu}>Hautpmenü</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', display: "flex", justifyContent: "center"}}>
                        <Form.Control type={"text"} placeholder={"Suchen..."} style={{
                            width: "30%",
                            fontSize: "1.5rem"
                        }} id={"search-bar"} onChange={ProjectSelector.search}/>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "50%", color: "white"}} id={"blockly-projects"}>
                            <h2>Blockly Projekte</h2>
                        </div>
                        <div style={{flex: "50%", color: "white"}} id={"code-projects"}>
                            <h2>Code Projekte</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        ProjectSelector.updateProjects()
    }

    /**
     * Shows the Main Menu
     */
    showMainMenu() {
        UIManager.showMainMenu()
        UIManager.hideMenuBar()
    }

    /**
     * Imports a project
     */
    import() {
        const element = document.createElement('input');
        element.type = 'file'

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        element.onchange = () => {

            // @ts-ignore
            let file = element.files[0];

            if (file) {
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    // @ts-ignore
                    let result: string = evt.target.result;

                    if (/^[\],:{}\s]*$/.test(result.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                        let o = JSON.parse(result);

                        let pName = o.name;
                        let pType = o.type;
                        let pCode = o.code;

                        const create = () => {
                            if (pName && pType && pCode) {

                                const c = () => {
                                    if (ProjectManager.createProject(pName, pType, pCode)) {
                                        ProjectSelector.search()
                                        UIManager.ask("<h1 style='text-align:center;'>Erfolgreich</h1><h4 style='text-align:center;'>Das Projekt wurde erfolgreich importiert! Willst du es jetzt öffnen?</h4>", () => {
                                            ProjectManager.openProject(pName, pType);
                                        })
                                    } else {
                                        UIManager.alert("<h1 style='text-align:center; color: red;'>Fehler</h1><h4 style='text-align:center;'>Das Projekt konnte nicht importiert werden!</h4>")
                                    }
                                }

                                if (ProjectManager.doesProjectExist(pName) || pName.length < 4) {
                                    UIManager.prompt("<h1 style='text-align:center; color: red;'>Fehler</h1><h4 style='text-align:center;'>Der Projektname ist bereits vergeben (oder zu kurz), bitte gib einen anderen Namen ein!</h4>",
                                        (value) => {
                                            if (ProjectManager.doesProjectExist(value) || pName.length < 4) {
                                                create();
                                            } else {
                                                pName = value;
                                                o.name = pName;
                                                c();
                                            }
                                        }
                                    )
                                } else c();
                            } else {
                                UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei ist keine InCode Projekt Datei!</h4>")
                            }
                        }

                        create();

                    } else {
                        UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei ist keine InCode Projekt Datei!</h4>")
                    }
                }

                reader.onerror = () => {
                    UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1><h4 style='text-align:center;'>Die Datei konnte nicht gelesen werden!</h4>")
                }
            }

            document.body.removeChild(element);
        }
    }

    public static updateProjects(projects: ObjectDefinition = {ex: true}) {

        (document.getElementById('code-projects') as HTMLDivElement).innerHTML = "<h2>Code Projekte</h2>";
        (document.getElementById('blockly-projects') as HTMLDivElement).innerHTML = "<h2>Blockly Projekte</h2>";

        let a2u: ObjectDefinition;

        if (!projects.ex) {
            a2u = projects;
        } else {
            a2u = this.getProjects();
        }
        Object.keys(a2u).forEach(p => {
            let project = this.getProjects()[p];

            let element = document.createElement('div');
            element.classList.add('template');

            element.addEventListener('click', () => {

                TempOptions.options[0x10AD] = p
                UIManager.hideAllPopups();
                // 0x10AD is the internal identifier of the temporary project name address in the TempOptions.options object
                TempOptions.options[0x10AD] = p;
                UIManager.hideMenu();
                UIManager.showMenuBar();
                ProjectManager.openProject(p, ProjectManager.getProjectType(p));

            })

            let image = document.createElement('img');
            image.width = 128
            image.height = 128

            let h5 = document.createElement('h5');
            h5.classList.add('template-name')
            h5.innerText = p;

            if (project.type === 'monaco') {
                image.src = "assets/code-editor.png"
            } else {
                image.src = "https://developers.google.com/blockly/images/logos/logo_only.png"
            }

            element.appendChild(image)
            element.appendChild(h5)

            if (project.type === 'monaco') {
                (document.getElementById('code-projects') as HTMLDivElement).appendChild(element)
            } else {
                (document.getElementById('blockly-projects') as HTMLDivElement).appendChild(element)
            }

        })
    }

    public static getProjects(): ObjectDefinition {
        let projects: ObjectDefinition = {};
        for (let i = 0; i < localStorage.length; i++) {
            if (JSON.parse(localStorage.getItem(localStorage.key(i) as string) as string).name) {
                projects[JSON.parse(localStorage.getItem(localStorage.key(i) as string) as string).name] = JSON.parse(localStorage.getItem(localStorage.key(i) as string) as string);
            }
        }
        return projects;
    }

    public static search() {
        let term = (document.getElementById('search-bar') as HTMLInputElement).value.trim();
        if (term.length > 0) {
            let projects: ObjectDefinition = {};
            Object.keys(ProjectSelector.getProjects()).forEach(p => {
                let project = ProjectSelector.getProjects()[p];
                if (p.toLowerCase().includes(term.toLowerCase()))
                    projects[p] = project;
            })
            ProjectSelector.updateProjects(projects);
        } else {
            ProjectSelector.updateProjects();
        }
    }
}

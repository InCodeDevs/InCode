/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Form} from "react-bootstrap";
import {ObjectDefinition} from "../TempOptions";
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
                <div style={{textAlign: 'center'}}>
                    <h1 style={{color: "#F8F9FAFF", marginTop: "2%"}}>Vorlagen</h1>
                    <div style={{textAlign: 'center', display: "flex", justifyContent: "center"}}>
                        <Form.Control type={"text"} placeholder={"Suchen..."} style={{
                            width: "30%",
                            fontSize: "1.5rem"
                        }} id={"search-bar"} onChange={TemplateSelector.search}/>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "50%", color: "white"}} id={"blockly-templates"}>
                            <h2>Blockly Vorlagen</h2>
                        </div>
                        <div style={{flex: "50%", color: "white"}} id={"code-templates"}>
                            <h2>Code Vorlagen</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        TemplateSelector.downloadTemplates();
        TemplateSelector.updateTemplates()
    }

    public static updateTemplates(templates: ObjectDefinition = {ex: true}) {

        (document.getElementById('code-templates') as HTMLDivElement).innerHTML = "<h2>Code Vorlagen</h2>";
        (document.getElementById('blockly-templates') as HTMLDivElement).innerHTML = "<h2>Blockly Vorlagen</h2>";

        let a2u: ObjectDefinition;

        if (!templates.ex) {
            a2u = templates;
        } else {
            a2u = this.getTemplates();
        }
        Object.keys(a2u).forEach(t => {
            let template = this.getTemplates()[t];

            let element = document.createElement('div');
            element.classList.add('template');

            element.addEventListener('click', () => {
                const p = () => {
                    if(!template.verified){
                        UIManager.ask(
                            "<h1 style='text-align: center'>Achtung</h1>" +
                            "<h4 style='text-align: center; color: red;'>Diese Vorlage ist nicht offiziell und funktioniert möglicherweise nicht. Willst du die Vorlage trotzdem verwenden?</h4>",
                            () => {
                            p0();
                        })
                    }else {
                        p0();
                    }
                }

                const p0 = () => {
                    UIManager.prompt(
                        "<h1 style='text-align: center'>Projekt Erstellen</h1>" +
                        "<h4 style='text-align: center'>Bitte gib den Namen deines neuen Projektes ein!</h4>",
                        (value: string) => {
                            if (ProjectManager.doesProjectExist(value)) {
                                UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                                    "<h4 style='text-align: center;'>Dieser Name ist bereits vergeben!</h4>", p);
                            } else {
                                if (value.length < 4) {
                                    UIManager.alert("<h1 style='text-align: center; color: red'>Fehler</h1>" +
                                        "<h4 style='text-align: center;'>Der Name ist zu kurz! Er muss mindestens 4 Zeichen lang sein!</h4>", p)
                                } else {
                                    UIManager.hideAllPopups();

                                    let x = new XMLHttpRequest();
                                    x.open("GET", "https://templates.incode.craftions.net/" + template.directURL, false)
                                    x.send(null)

                                    MainMenu.createProject0(value, template.type, atob(x.responseText))
                                }
                            }
                        }
                    )
                }

                p()
            })

            let verified = document.createElement('span')
            verified.className = 'verified';
            verified.innerText = "✓"

            if (!template.verified) {
                verified.style.visibility = 'hidden'
            }

            let image = document.createElement('img');
            image.width = 128
            image.height = 128

            let h5 = document.createElement('h5');
            h5.classList.add('template-name')
            h5.innerText = t;

            if (template.type === 'monaco') {
                image.src = "assets/code-editor.png"
            } else {
                image.src = "https://developers.google.com/blockly/images/logos/logo_only.png"
            }

            element.appendChild(verified)
            element.appendChild(image)
            element.appendChild(h5)

            if (template.type === 'monaco') {
                (document.getElementById('code-templates') as HTMLDivElement).appendChild(element)
            } else {
                (document.getElementById('blockly-templates') as HTMLDivElement).appendChild(element)
            }

        })
    }

    public static templates: ObjectDefinition = {};

    public static downloadTemplates() {
        let x = new XMLHttpRequest();
        x.open("GET", "https://templates.incode.craftions.net/templates.json", false)
        x.send(null)
        this.templates = JSON.parse(x.responseText)
    }

    public static getTemplates(): ObjectDefinition {
        return this.templates;
    }

    public static search() {
        let term = (document.getElementById('search-bar') as HTMLInputElement).value.trim();
        if (term.length > 0) {
            let templates: ObjectDefinition = {};
            Object.keys(TemplateSelector.getTemplates()).forEach(t => {
                let template = TemplateSelector.getTemplates()[t];
                if (t.toLowerCase().includes(term.toLowerCase()))
                    templates[t] = template;
            })
            TemplateSelector.updateTemplates(templates);
        } else {
            TemplateSelector.updateTemplates();
        }
    }
}

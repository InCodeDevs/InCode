/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../Options";
import {ObjectDefinition, Registry} from "../Registry";

import {UIManager} from "../utils/UIManager";
import {ProjectManager} from "../utils/ProjectManager";
import {MainMenu} from "./MainMenu";
import {Button, Form} from "react-bootstrap";
import {Themes} from "../Themes";

export class Settings extends React.Component {

    public static readonly config: ObjectDefinition = {
        "theme": {
            display: "Erscheinungsbild",
            callback: () => {
                UIManager.showThemeSettings();
            },
            icon: "assets/code-editor.png"
        }
    }

    render() {
        return (
            <>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: "100%", marginTop: "2%", marginBottom: "2%"}}>
                        <h1 style={{color: "#F8F9FAFF", flex: "55%", textAlign: "right"}}>InCode Editor</h1>
                        <div style={{flex: "45%", display: "flex"}}>
                            <span style={{flex: "75%"}}/>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"} onClick={UIManager.showMainMenu}>Hauptmenü</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', display: "flex", justifyContent: "center"}}>
                        <Form.Control type={"text"} placeholder={"Einstellung Suchen..."} style={{
                            width: "30%",
                            fontSize: "1.5rem"
                        }} id={"search-bar"} onChange={Settings.search}/>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "100%", color: "white"}} id={"settings"}>
                            <h2>Erscheinungsbilder</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        Settings.updateSettings();
    }


    public static updateSettings(settings: ObjectDefinition = {ex: true}) {

        (document.getElementById('settings') as HTMLDivElement).innerHTML = "<h2>Einstellungen</h2>";

        let a2u: ObjectDefinition;

        if (settings.ex !== true) {
            a2u = settings;
        } else {
            a2u = Settings.config;
        }

        Object.keys(a2u).forEach(s => {
            let setting = a2u[s];

            let element = document.createElement('div');
            element.classList.add('template');

            element.addEventListener('click', () => {
                setting.callback();
            })

            let image = document.createElement('img');
            image.width = 128
            image.height = 128

            image.src = setting.icon;

            let h5 = document.createElement('h5');
            h5.classList.add('template-name')
            h5.innerText = setting.display;

            element.appendChild(image)
            element.appendChild(h5);

            (document.getElementById('settings') as HTMLDivElement).appendChild(element)

        });
    }

    public static search() {
        let term = (document.getElementById('search-bar') as HTMLInputElement).value.trim();
        if (term.length > 0) {
            let settings: ObjectDefinition = {};
            Object.keys(Settings.config).forEach(t => {
                let setting = Settings.config[t];
                if (t.toLowerCase().includes(term.toLowerCase()) || setting.display.toLowerCase().includes(term.toLowerCase()))
                    settings[t] = setting;
            })
            Settings.updateSettings(settings);
        } else {
            Settings.updateSettings();
        }
    }

}

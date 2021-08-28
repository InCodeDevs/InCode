/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {ObjectDefinition} from "../Registry";

import {UIManager} from "../utils/UIManager";
import {MainMenu} from "./MainMenu";
import {Button, Form} from "react-bootstrap";
import {SettingsScreen} from "./util/SettingsScreen";
import { Props, State, Entry } from "../types/SettingsScreen";
import {Themes} from "../Themes";

export class Settings extends React.Component {

    public static readonly config: ObjectDefinition = {
        "theme": {
            display: "Erscheinungsbild",
            callback: () => {
                let themes: Entry[] = [];

                Object.keys(Themes.themes).forEach(t => {
                    let theme = Themes.themes[t];

                    let entry: Entry = {
                        title: theme.display,
                        imageURL: 'assets/code-editor-light.png',
                        callback: () => {
                            localStorage.setItem("incode-editor.theme", t);
                            window.location.reload();
                        }
                    };

                    if(theme.scheme === 'dark')
                        entry.imageURL = 'assets/code-editor.png';

                    themes.push(entry);
                })

                UIManager.showComponent(<SettingsScreen title={"Erscheinungsbild"} settings={themes}/>);
            },
            icon: "assets/code-editor.png"
        },
        "animations": {
            display: "Animationen",
            callback: () => {
                UIManager.showComponent(<SettingsScreen title={"Animationen"} settings={[
                    {
                        title: "Aktivieren",
                        callback: () => {
                            localStorage.setItem("incode-editor.enableAnimations", "true")
                            window.location.reload();
                        },
                        imageURL: "assets/check.png"
                    },
                    {
                        title: "Deaktivieren",
                        callback: () => {
                            localStorage.setItem("incode-editor.enableAnimations", "false")
                            window.location.reload();
                        },
                        imageURL: "assets/x.png"
                    }
                ]}/>);
            },
            icon: "https://user-images.githubusercontent.com/53553315/116579197-71484800-a912-11eb-8d6e-17cc50d8027d.png"
        },
        "storage": {
            display: "Speicher",
            callback: () => {
                UIManager.showComponent(<SettingsScreen title={"Speicher"} settings={[
                    {
                        title: "Speicher löschen",
                        callback: () => {
                            UIManager.ask(
                                "<h1>Fortfahren?</h1>" +
                                "<h4>Durch diese Aktion werden alle Einstellungen, sowie all deine Projekte unwiederuflich gelöscht! Willst du wirklich fortfahren?</h4>",
                                () => {
                                    for (let i = 0; i < localStorage.length; i++) {
                                        localStorage.removeItem(localStorage.key(i) as string);
                                    }
                                    window.location.reload();
                                })
                        },
                        imageURL: "assets/x.png"
                    },
                    {
                        title: "Einstellungen zurücksetzen",
                        callback: () => {
                            UIManager.ask(
                                "<h1>Fortfahren?</h1>" +
                                "<h4>Durch diese Aktion werden alle Einstellungen zurückgesetzt! Willst du wirklich fortfahren?</h4>",
                                () => {
                                    localStorage.removeItem('incode-editor.theme');
                                    localStorage.removeItem('incode-editor.enableAnimations');
                                    window.location.reload();
                                })
                        },
                        imageURL: "assets/x.png"
                    }
                ]}/>);
            },
            icon: "assets/settings.png"
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
                                <Button variant={"outline-flat"} size={"xxl"} onClick={() => {
                                    UIManager.showComponent(<MainMenu/>)
                                }}>Hauptmenü</Button>
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

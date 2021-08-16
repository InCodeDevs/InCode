/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {ObjectDefinition} from "../../Registry";
import {UIManager} from "../../utils/UIManager";
import {Themes} from "../../Themes";

export class ThemeSettings extends React.Component {

    render() {
        return (
            <>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: "100%", marginTop: "2%", marginBottom: "2%"}}>
                        <h1 style={{color: "#F8F9FAFF", flex: "55%", textAlign: "right"}}>InCode Editor</h1>
                        <div style={{flex: "45%", display: "flex"}}>
                            <span style={{flex: "50%"}}/>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"} onClick={UIManager.showSettings}>Zurück</Button>
                            </div>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"} onClick={UIManager.showMainMenu}>Hauptmenü</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', display: "flex", justifyContent: "center"}}>
                        <Form.Control type={"text"} placeholder={"Erscheinungsbild Suchen..."} style={{
                            width: "30%",
                            fontSize: "1.5rem"
                        }} id={"search-bar"} onChange={ThemeSettings.search}/>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "100%", color: "white"}} id={"themes"}>
                            <h2>Erscheinungsbilder</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        ThemeSettings.updateThemes();
    }


    public static updateThemes(themes: ObjectDefinition = {ex: true}) {

        (document.getElementById('themes') as HTMLDivElement).innerHTML = "<h2>Erscheinungsbilder</h2>";

        let a2u: ObjectDefinition;

        if (themes.ex !== true) {
            a2u = themes;
        } else {
            a2u = Themes.themes;
        }

        Object.keys(a2u).forEach(t => {
            let theme = a2u[t];

            let element = document.createElement('div');
            element.classList.add('template');

            element.addEventListener('click', () => {
                localStorage.setItem("incode-editor.theme", t);
                window.location.reload();
            })

            let image = document.createElement('img');
            image.width = 128
            image.height = 128

            if (theme.scheme === 'dark') {
                image.src = "assets/code-editor.png";
            } else {
                image.src = "assets/code-editor-light.png";
            }

            let h5 = document.createElement('h5');
            h5.classList.add('template-name')
            h5.innerText = theme.display;

            element.appendChild(image)
            element.appendChild(h5);

            (document.getElementById('themes') as HTMLDivElement).appendChild(element)

        });
    }

    public static search() {
        let term = (document.getElementById('search-bar') as HTMLInputElement).value.trim();
        if (term.length > 0) {
            let themes: ObjectDefinition = {};
            Object.keys(Themes.themes).forEach(t => {
                let theme = Themes.themes[t];
                if (t.toLowerCase().includes(term.toLowerCase()) || theme.display.toLowerCase().includes(term.toLowerCase()))
                    themes[t] = theme;
            })
            ThemeSettings.updateThemes(themes);
        } else {
            ThemeSettings.updateThemes();
        }
    }

}

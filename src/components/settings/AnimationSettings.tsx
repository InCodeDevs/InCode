/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {ObjectDefinition} from "../../Registry";
import {UIManager} from "../../utils/UIManager";
import {Themes} from "../../Themes";
import {Settings} from "../Settings";
import {MainMenu} from "../MainMenu";

export class AnimationSettings extends React.Component {

    render() {
        return (
            <>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: "100%", marginTop: "2%", marginBottom: "2%"}}>
                        <h1 style={{color: "#F8F9FAFF", flex: "55%", textAlign: "right"}}>InCode Editor</h1>
                        <div style={{flex: "45%", display: "flex"}}>
                            <span style={{flex: "50%"}}/>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"}
                                        onClick={() => {
                                            UIManager.showComponent(<Settings />)
                                        }}>Zurück</Button>
                            </div>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"}
                                        onClick={() => {
                                            UIManager.showComponent(<MainMenu />)
                                        }}>Hauptmenü</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "100%", color: "white"}} id={"themes"}>
                            <h2>Animationen</h2>
                            <div className={"template"} onClick={this.enable}>
                                <img src={"assets/check.png"} width={128} height={128} />
                                <h5 className={"template-name"}>Aktivieren</h5>
                            </div>
                            <div className={"template"} onClick={this.disable}>
                                <img src={"assets/x.png"} width={128} height={128} />
                                <h5 className={"template-name"}>Deaktivieren</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    enable() {
        localStorage.setItem("incode-editor.enableAnimations", "true")
        window.location.reload();
    }

    disable() {
        localStorage.setItem("incode-editor.enableAnimations", "false")
        window.location.reload();
    }

}

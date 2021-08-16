/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {ObjectDefinition} from "../../Registry";
import {UIManager} from "../../utils/UIManager";
import {Themes} from "../../Themes";

export class StorageSettings extends React.Component {

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
                                        onClick={UIManager.showSettings}>Zurück</Button>
                            </div>
                            <div style={{flex: "25%"}}>
                                <Button variant={"outline-flat"} size={"xxl"}
                                        onClick={UIManager.showMainMenu}>Hauptmenü</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        <div style={{flex: "100%", color: "white"}} id={"themes"}>
                            <h2>Speicher</h2>
                            <div className={"template"} onClick={this.deleteStorage}>
                                <img src={"assets/x.png"} width={128} height={128} />
                                <h5 className={"template-name"}>Speicher löschen</h5>
                            </div>
                            <div className={"template"} onClick={this.deleteSettings}>
                                <img src={"assets/x.png"} width={128} height={128} />
                                <h5 className={"template-name"}>Einstellungen löschen</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    deleteStorage() {
        UIManager.ask(
            "<h1 style='text-align: center'>Fortfahren?</h1>" +
            "<h4>Willst du, dass alle Einstellungen und Projekte gelöscht werden? <span style='color: red'>(Dies kann nicht rückgängig gemacht werden</span></h4>",
            () => {
                for (let i = 0; i < localStorage.length; i++) {
                    localStorage.removeItem(localStorage.key(i) as string);
                }
                window.location.reload();
            }
        )
    }

    deleteSettings() {
        UIManager.ask(
            "<h1 style='text-align: center'>Fortfahren?</h1>" +
            "<h4>Willst du, dass alle Einstellungen gelöscht werden? <span style='color: red'>(Dies kann nicht rückgängig gemacht werden</span></h4>",
            () => {
                localStorage.removeItem('incode-editor.theme');
                localStorage.removeItem('incode-editor.enableAnimations');
                window.location.reload();
            }
        )
    }

}

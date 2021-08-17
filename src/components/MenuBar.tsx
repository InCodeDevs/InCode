/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {UIManager} from "../utils/UIManager";
import {Workspace} from "../utils/Workspace";
import {ProjectManager} from "../utils/ProjectManager";

export class MenuBar extends React.Component {

    /**
     * Renders the Menu Bar
     * @return The Menu Bar
     */
    render() {

        return (
            <>
                <div style={{
                    display: "flex",
                    top: "50%",
                    left: "50%",
                    position: "relative",
                    transform: "translate(-50%, -50%)"
                }}>
                    <div style={{flex: "33%", textAlign: "center", display: 'flex'}}>
                        <Dropdown style={{flex: "50%", textAlign: "center"}} id={"projectButton"}>
                            <Dropdown.Toggle variant="outline-flat" size={"xxl"}>
                                Projekt
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={Workspace.save}>Speichern</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.saveProjectFile}>Projektdatei Speichern</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.export}>Exportieren</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.rename}>Namen ändern</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.changeEnvType}>Projekttyp ändern</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.deploy}>Vorlage veröffentlichen</Dropdown.Item>
                                <Dropdown.Item onClick={Workspace.delete}>Projekt löschen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div style={{flex: "50%", textAlign: "center"}} id={"rl-preview-btn"}>
                            <Button id={"previewButton"} variant={"outline-flat"} size={"xxl"} onClick={Workspace.preview}>Preview neu laden</Button>;
                        </div>
                    </div>
                    <div style={{flex: "33%"}}>
                        <h1 style={{color: '#F8F9FAFF', textAlign: "center"}}>
                            <div style={{textAlign: "center"}}>
                                InCode Editor
                            </div>
                        </h1>
                    </div>
                    <div style={{flex: "25%", textAlign: "center"}}>
                        <Button variant={"outline-flat"} size={"xxl"} onClick={this.showMainMenu}>Hauptmenü</Button>
                    </div>
                </div>
            </>
        );
    }

    /**
     * Shows the Main Menu
     */
    showMainMenu() {
        Workspace.save(false);
        if(document.getElementById('livePreviewFrame') != undefined){
            (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
        }
        UIManager.deleteBlockly();
        UIManager.deleteMonaco();
        UIManager.showMainMenu()
        UIManager.hideMenuBar()
    }
}

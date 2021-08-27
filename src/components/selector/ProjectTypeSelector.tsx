/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../../Options";
import { Registry } from "../../Registry";

import {UIManager} from "../../utils/UIManager";
import {ProjectManager} from "../../utils/ProjectManager";
import {MainMenu} from "../MainMenu";

export class ProjectTypeSelector extends React.Component {

    render() {
        return (
            <>
                <div style={{
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%, -50%)',
                    position: "absolute",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#F8F9FAFF"}}>Projekt Typ auswählen</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.useWebsite}>
                            <img
                                src={"/assets/website.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Website <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Eine einfache Website</span>
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.useStyledWebsite}>
                            <img
                                src={"/assets/website.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Styled Website <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Eine vordesignte Website</span>
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.useDesktop}>
                            <img
                                src={"/assets/desktop.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Desktop App <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Eine einfache Desktop Anwendung <strong>(Windows only)</strong></span>
                            </p>
                        </div>
                    </div>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.useStyledDesktop}>
                            <img
                                src={"/assets/desktop.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Styled Desktop App <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Eine vordesignte Desktop Anwendung <strong>(Windows only)</strong></span>
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.useGame}>
                            <img
                                src={"/assets/game.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Game <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Ein einfaches Spiel</span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useWebsite(){
        Registry.getRegister(0x10AF)("website");
    }

    useStyledWebsite(){
        Registry.getRegister(0x10AF)("styled-website");
    }

    useDesktop(){
        Registry.getRegister(0x10AF)("desktop");
    }

    useStyledDesktop(){
        Registry.getRegister(0x10AF)("styled-desktop");
    }

    useGame(){
        UIManager.alert(
            "<h1 style='text-align: center'>Achtung!</h1>" +
            "<h4 style='text-align:center;'>Dieses Feature ist aktuell in Arbeit!</h4>"
        )
    }
}

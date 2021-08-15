/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Options } from "../Options";
import { Registry } from "../Registry";

import {UIManager} from "../utils/UIManager";
import {ProjectManager} from "../utils/ProjectManager";
import {MainMenu} from "./MainMenu";

export class Settings extends React.Component {

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
                    <h1 style={{color: "#F8F9FAFF"}}>Einstellungen</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.openThemes}>
                            <img
                                src={"/assets/website.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Website <br/>
                                <span style={{fontFamily: "Comic Sans MS"}}>Darstellung</span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    openThemes(){
        UIManager.showThemeSettings();
    }

}

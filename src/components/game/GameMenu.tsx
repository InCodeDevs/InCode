/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";

export class GameMenu extends React.Component {

    render() {
        return (
            <>
                <div style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    textAlign: "center"
                }}>
                    <h1 style={{color: "#F8F9FAFF"}}>Was willst du lernen?</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"}>
                            <img
                                src={"https://developers.google.com/blockly/images/logos/logo_only.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Programmieren mit Blöcken
                            </p>
                        </div>
                        <div className={"menu-choose-editor"}>
                            <img
                                src={"assets/code-editor.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Programmieren mit Text
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
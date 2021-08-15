/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";

export class ThemeSettings extends React.Component {

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
                    <h1 style={{color: "#F8F9FAFF"}}>Erscheinungsbild</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.useLight}>
                            <img
                                src={"/assets/website.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Hell
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.useDark}>
                            <img
                                src={"/assets/website.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Dunkel
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useLight() {
        localStorage.setItem("incode-editor.theme", "light");
        window.location.reload();
    }

    useDark(){
        localStorage.setItem("incode-editor.theme", "dark");
        window.location.reload();
    }

}

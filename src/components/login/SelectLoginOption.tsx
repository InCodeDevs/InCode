/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import {UIManager} from "../../utils/UIManager";
import {User} from "../../utils/User";
import {UserUtil} from "../../utils/UserUtil";
import {MainMenu} from "../MainMenu";

export class SelectLoginOption extends React.Component {

    render() {
        return (
            <>
                <div
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{color: "#F8F9FAFF"}}>Anmelden</h1>

                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.login}>
                            <img
                                src={"assets/editor-open-project.png"}
                                width={128}
                                height={128}
                            />
                            <p className={"menu-editor-description"}>
                                Anmelden
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.register}>
                            <img src={"assets/editor-create-project.png"} width={128} height={128}/>
                            <p className={"menu-editor-description"}>
                                Registrieren
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    login() {
        function x() {
            UIManager.prompt("<h1>Anmelden</h1><h4>Bitte gib deinen Nutzernamen ein</h4>", (username) => {
                UIManager.prompt("<h1>Anmelden</h1><h4>Bitte gib dein Passwort ein</h4>", async (password) => {
                    let status = await UserUtil.loginAndSave(username, password)
                    if (status) {
                        UIManager.alert("<h1>Erfolgreich!</h1><h4>Du bist nun als " + username + " angemeldet.</h4>", () => {
                            UIManager.showComponent(<MainMenu/>)
                        })
                    } else {
                        UIManager.alert("<h1>Fehler</h1><h4>Das Passwort oder der Nutzername ist falsch!</h4>", x)
                    }
                })
            })
        }
        x();
    }

    register() {
        function x() {
            UIManager.prompt("<h1>Registrieren</h1><h4>Bitte gib deinen Nutzernamen ein</h4>", (username) => {
                p();

                function p() {
                    UIManager.prompt("<h1>Registrieren</h1><h4>Bitte gib dein Passwort ein</h4>", async (_password) => {
                        UIManager.prompt("<h1>Registrieren</h1><h4>Bitte gib dein Passwort erneut ein</h4>", async (password) => {
                            if (password === _password) {
                                await c(username, password);
                            } else {
                                UIManager.alert("<h1>Fehler</h1><h4>Die Passwörter stimmen nich überein!</h4>", () => {
                                    p();
                                })
                            }

                        })
                    })
                }

                async function c(username: string, password: string) {
                    let createStatus = await User.create(username, password)
                    if (createStatus) {
                        await UserUtil.loginAndSave(username, password);
                        UIManager.alert("<h1>Erfolgreich!</h1><h4>Du bist nun als " + username + " angemeldet.</h4>", () => {
                            UIManager.showComponent(<MainMenu/>)
                        })
                    } else {
                        UIManager.alert("<h1>Fehler</h1><h4>Der Nutzername ist vergeben!</h4>", () => {
                            x();
                        })
                    }
                }
            })
        }

        x();
    }

}
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Props, State} from "../../types/ShareProject";
import {Registry} from "../../utils/Registry";
import {Language} from "../../utils/international/Language";
import {Button} from "react-bootstrap";
import {UIManager} from "../../utils/UIManager";
import {MainMenu} from "../MainMenu";
import {ProjectManager} from "../../utils/ProjectManager";
import {User} from "../../utils/User";
import {UserUtil} from "../../utils/UserUtil";

export class ShareProject extends React.Component<Props, State> {

    render() {

        const projectName = Registry.getRegister(0x10AD)

        const projectConfig = JSON.parse(localStorage.getItem("incode-editor.projects." + projectName) as string);

        const project = {
            name: projectName,
            isShared: projectConfig.save === "shared",
            code: projectConfig.code,
            env: projectName.env,
            type: projectConfig.type
        }

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        marginTop: "2%",
                        marginBottom: "2%",
                    }}
                >
                    <div
                        style={{flex: "45%", display: "flex", justifyContent: "right"}}
                    >
                        <Button
                            variant={"outline-flat"}
                            size={"xxl"}
                            style={{
                                marginRight: "1.5rem",
                            }}
                            onClick={() => {
                                ProjectManager.openProject(projectName);
                            }}
                        >
                            {
                                Language.a("menu.back")
                            }
                        </Button>
                        <Button
                            variant={"outline-flat"}
                            size={"xxl"}
                            style={{
                                marginRight: "1.5rem",
                            }}
                            onClick={() => {
                                UIManager.showComponent(<MainMenu/>);
                            }}
                        >
                            {
                                Language.a("menu.main")
                            }
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{color: "#F8F9FAFF"}}>
                        {Language.a("menu.share.title")}
                    </h1>
                    <div className={"menu-choose-editors-root"}>
                        {
                            project.isShared ? (
                                <>
                                    true
                                </>
                            ) : (
                                <>
                                    <div
                                        className={"menu-choose-editor"}
                                        onClick={function __btn__on_click() {
                                            UIManager.prompt("<h1>" + Language.a("menu.share.title") + "</h1><h4>" + Language.a("menu.share.who") + "</h4>",
                                                (value) => {
                                                    const username = UserUtil.getSavedUser().username;
                                                    const password = UserUtil.getSavedUser().password;

                                                    if (value === username) {
                                                        UIManager.alert("<h1>" + Language.a("menu.failed") + "</h1><h4>" + Language.a("menu.share.who.failed.self") + "</h4>", () => {
                                                            __btn__on_click();
                                                        })
                                                    } else {
                                                        User.existsUser(value).then(x => {
                                                            if (x) {
                                                                projectConfig.save = "shared";
                                                                User.storeData(
                                                                    username, password, projectConfig, username + "_projects-" + projectName
                                                                ).then(() => {
                                                                    User.allowDataAccess(
                                                                        username, password, username + "_projects-" + projectName, value
                                                                    ).then(() => {
                                                                        User.getData_u(
                                                                            username, password, "shared-projects"
                                                                        ).then(d => {
                                                                            console.log("xxx")
                                                                            let r = [];
                                                                            if(d !== undefined && d !== null){
                                                                                r = d;
                                                                            }
                                                                            r[projectName] = username
                                                                            User.storeData_u(
                                                                                username, password, r, "shared-projects"
                                                                            ).then(() => {
                                                                                UIManager.alert("<h1>" + Language.a("menu.success") + "</h1><h4>" + Language.a("menu.share.success") + "</h4>", () => {
                                                                                    UIManager.showComponent(<MainMenu />)
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            } else {
                                                                UIManager.alert("<h1>" + Language.a("menu.failed") + "</h1><h4>" + Language.a("menu.share.who.failed") + "</h4>",
                                                                    () => {
                                                                        __btn__on_click()
                                                                    })
                                                            }
                                                        })
                                                    }
                                                })
                                        }}
                                    >
                                        <img
                                            src={"assets/editor-open-project.png"}
                                            width={128}
                                            height={128}
                                        />
                                        <p className={"menu-editor-description"}>
                                            {Language.a("menu.share.title")}
                                        </p>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}
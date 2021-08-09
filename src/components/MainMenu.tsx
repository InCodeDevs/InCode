import * as React from "react";

export class MainMenu extends React.Component {
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
                    <h1 style={{color: "#F8F9FAFF"}}>InCode Editor</h1>
                    <div className={"menu-choose-editors-root"}>
                        <div className={"menu-choose-editor"} onClick={this.createNewProject}>
                            <img
                                src={"assets/editor-create-project.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Projekt <br /> Erstellen
                            </p>
                        </div>
                        <div className={"menu-choose-editor"} onClick={this.openProject}>
                            <img
                                src={"assets/editor-open-project.png"} width={128}
                                height={128}/>
                            <p className={"menu-editor-description"}>
                                Projekt <br /> Öffnen
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    public openProject() {
    }

    public createNewProject() {
    }
}

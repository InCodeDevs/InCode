import * as React from "react";
import Button from "react-bootstrap/Button";
import {compileWS, deleteBlockly, deleteMonaco, hideMenu, hideMenuBar, Options, preview, showMenu} from '../index'

export class MenuBar extends React.Component {
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
                        <div style={{flex: "50%", textAlign: "center"}} id={"export-btn"}>
                            <Button variant={"outline-flat"} size={"xxl"} onClick={compileWS}>Exportieren</Button>
                        </div>
                        <div style={{flex: "50%", textAlign: "center"}} id={"rl-preview-btn"}>
                            <Button variant={"outline-flat"} size={"xxl"} onClick={preview}>Preview neu laden</Button>
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
                        <Button variant={"outline-flat"} size={"xxl"} onClick={this.showMainMenu}>Hautpmenü</Button>
                    </div>
                </div>
            </>
        );
    }

    showMainMenu() {
        if(document.getElementById('livePreviewFrame') != undefined){
            (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
        }
        deleteBlockly();
        deleteMonaco();
        showMenu()
        hideMenuBar()
    }
}

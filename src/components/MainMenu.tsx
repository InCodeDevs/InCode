import * as React from "react";
import Button from 'react-bootstrap/Button';
import {createBlockly, createMonaco, hideMenu, showMenuBar} from "../index";

export class MainMenu extends React.Component {

    render() {
        return (
            <>
                <div style={{top: "50%", left: "50%", transform: 'translate(-50%, -50%)', position: "absolute", textAlign: "center"}}>
                    <h1 style={{color: "#F8F9FAFF"}}>InCode Editor</h1>
                    <Button variant={"outline-flat"} size={"xxl"} onClick={this.openBlockEditor}>Block Editor</Button>
                    <Button variant={"outline-flat"} size={"xxl"} onClick={this.openMonaco}>Text Editor</Button>
                </div>
            </>
        )
    }

    openBlockEditor() {
        hideMenu();
        showMenuBar();
        createBlockly();
    }

    openMonaco() {
        hideMenu();
        showMenuBar()
        createMonaco()
    }
}

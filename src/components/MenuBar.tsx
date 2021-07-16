import * as React from "react";
import Button from "react-bootstrap/Button";
import {compileWS} from '../index'

export class MenuBar extends React.Component {
    render() {
        return (
            <>
                <div style={{display: "flex", top: "50%", left: "50%", position: "relative", transform: "translate(-50%, -50%)"}}>
                    <div style={{flex: "33%", textAlign: "center"}}>
                        <Button variant={"outline-flat"} size={"xxl"} onClick={compileWS}>Exportieren</Button>
                    </div>
                    <div style={{flex: "33%"}}>
                        <h1 style={{color: '#F8F9FAFF', textAlign: "center"}}>
                            <div style={{textAlign: "center"}}>
                                InCode Block Editor
                            </div>
                        </h1>
                    </div>
                    <div style={{flex: "33%", textAlign: "center"}}>
                        <Button variant={"outline-flat"} size={"xxl"} onClick={this.showMainMenu}>Hautpmenü</Button>
                    </div>
                </div>
            </>
        );
    }

    showMainMenu(){
        (document.getElementById('menu') as HTMLDivElement).style.visibility = 'visible';
        (document.getElementById('blockly') as HTMLDivElement).style.visibility = 'hidden';
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'none';
    }
}

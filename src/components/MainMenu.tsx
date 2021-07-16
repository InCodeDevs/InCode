import * as React from "react";
import Button from 'react-bootstrap/Button';

export class MainMenu extends React.Component {

    render() {
        return (
            <>
                <div style={{top: "50%", left: "50%", transform: 'translate(-50%, -50%)', position: "absolute", textAlign: "center"}}>
                    <h1 style={{color: "#F8F9FAFF"}}>InCode Editor</h1>
                    <Button variant={"outline-flat"} size={"xxl"} onClick={this.openBlockEditor}>Block Editor</Button>
                </div>
            </>
        )
    }

    openBlockEditor() {
        (document.getElementById('menu') as HTMLDivElement).style.visibility = 'hidden';
        (document.getElementById('blockly') as HTMLDivElement).style.visibility = 'visible';
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'inherit';
    }
}

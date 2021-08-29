/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Avatar} from "../animations/Avatar";
import {YouTubeUtil} from "./YouTubeUtil";
import {Button} from "react-bootstrap";

export class CodeGame extends React.Component {

    render() {
        Avatar.disable();
        return (
            <div style={{textAlign: 'center'}}>
                <h1 style={{color: "#F9FAFF"}} id={"yt-video-name"}>Einführung</h1>
                <div id={"yt-video"}/><br />
                <Button variant={"outline-success"} size={"xxl"} id={"tutorial-forward"} style={{visibility: 'hidden'}}>Weiter</Button>
                {
                    /*
                    <div className={"teacher"} style={{display: 'none'}}>
                        <div className={"avatar"}>
                            <img id={"avatar-display"} src={"assets/game/new_avatar_1.png"} width={256} height={256}/>
                        </div>
                        <div className={"speech-bubble"}>
                            <div className={"pre-speech-bubble"}>
                                <div className={"speech-bubble-circle-one"}/>
                                <div className={"speech-bubble-circle-two"}/>
                            </div>
                            <h4 className={"speech-bubble-content"}>

                            </h4>
                        </div>
                    </div>
                     */
                }
            </div>
        );
    }

    componentDidMount() {
        YouTubeUtil.init()
        YouTubeUtil.play("znyESveH0Pk", () => {
            (document.getElementById('tutorial-forward') as HTMLButtonElement).style.visibility = 'visible'
        })
    }

}
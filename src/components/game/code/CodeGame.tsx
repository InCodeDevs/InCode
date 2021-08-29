/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Avatar} from "../animations/Avatar";

export class CodeGame extends React.Component {

    render() {
        Avatar.disable();
        return (
            <div style={{textAlign: 'center'}}>
                <iframe width="1280"
                        height="720"
                        src="https://www.youtube.com/embed/znyESveH0Pk"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        id="yt_vid"
                />
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
                            Hallo ich bin Lukas und ja
                        </h4>
                    </div>
                </div>
            </div>
        );
    }

    public static playVideo(id: string) {
        (document.getElementById('yt_vid') as HTMLIFrameElement).src = 'https://youtube.com/embed/' + id + "?autoplay=1&vq=720hd";
    }

    onVideoEnd() {
        alert("Hello World")
    }

    componentDidMount() {

        (document.getElementById('yt_vid') as HTMLIFrameElement).addEventListener('onStateChange', (state) => {
            alert(state)
            // @ts-ignore
            if(state as number === 0){
                this.onVideoEnd();
            }
        })
        CodeGame.playVideo('znyESveH0Pk');
        return;
        let t = "";

        t = document.querySelectorAll('.speech-bubble-content').item(0).innerHTML;

        (async () => {
            Avatar.enable()
            // await Avatar.speak(t)
            Avatar.disable()
        })();
    }
}
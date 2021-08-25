/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {Avatar} from "../animations/Avatar";

export class CodeGame extends React.Component {

    render() {
        Avatar.enable();
        return (
            <div>
                <div className={"teacher"}>
                    <div className={"avatar"}>
                        <img id={"avatar-display"} src={"assets/game/avatar.png"} width={256} height={256}/>
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
            </div>
        );
    }
}
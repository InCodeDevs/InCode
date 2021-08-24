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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem culpa eum exercitationem facilis inventore ipsum iure laboriosam minima natus, officiis praesentium quaerat quos rem sint tempora tempore, ullam ut. Accusamus asperiores assumenda delectus doloremque dolores doloribus earum exercitationem harum id minus obcaecati officiis, perspiciatis quidem quis quos repudiandae sapiente sunt voluptatum. Ab accusamus alias aliquam aliquid architecto aspernatur blanditiis commodi consequuntur et, ex, facere fugiat iste iure maxime molestias nisi obcaecati placeat reiciendis rem reprehenderit saepe sequi temporibus, vitae voluptas voluptate! A ab atque facilis fugit, inventore ipsa laudantium minus modi placeat quasi quibusdam recusandae sint vero. Dignissimos, modi!
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {Worker} from "./Worker";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {IncompatibleScreen} from "../../components/util/IncompatibleScreen";
import {UIManager} from "../../utils/UIManager";

export class ScreenScaling extends Worker {

    run() {
        let needIncompatibleScreenSizeScreen = false;
        let lastInnerWidth = window.innerWidth;
        let lastInnerHeight = window.innerHeight;

        setInterval(() => {
            needIncompatibleScreenSizeScreen = window.innerHeight < 768 || window.innerWidth < 1024;

            if (needIncompatibleScreenSizeScreen) {
                (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'block';
                ReactDOM.render((<IncompatibleScreen title={"Inkompatible Bildschirmgröße erkannt"} message={"Dein Bildschirm ist zu klein, bitte verwende einen größeren!"}/>), document.querySelector("#topScreen"));
            } else {
                (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'none';
                ReactDOM.unmountComponentAtNode((document.querySelector('#topScreen') as HTMLDivElement))
            }

            if (lastInnerWidth != window.innerWidth || lastInnerHeight != window.innerHeight) {
                UIManager.remakeSizes();
            }
            lastInnerHeight = window.innerHeight;
            lastInnerWidth = window.innerWidth;
        }, 10)
    }
}
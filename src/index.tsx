/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import "./styles/_index.scss"
import * as ReactDOM from "react-dom";
import {UIManager} from "./utils/UIManager";
import * as React from "react";
import {IncompatibleScreenSize} from "./components/IncompatibleScreenSize";
import { Workspace } from "./utils/Workspace";

let needIncompatibleScreenSizeScreen = false;
let lastInnerWidth = window.innerWidth;
let lastInnerHeight = window.innerHeight;

setInterval(() => {
    needIncompatibleScreenSizeScreen = window.innerHeight < 880 || window.innerWidth < 1400;

    if (needIncompatibleScreenSizeScreen) {
        (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'block';
        ReactDOM.render((<IncompatibleScreenSize/>), document.querySelector("#topScreen"));
    } else {
        (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'none';
        ReactDOM.unmountComponentAtNode((document.querySelector('#topScreen') as HTMLDivElement))
    }

    if(lastInnerWidth != window.innerWidth || lastInnerHeight != window.innerHeight){
        UIManager.remakeSizes();
    }
    lastInnerHeight = window.innerHeight;
    lastInnerWidth = window.innerWidth;
}, 10)

window.onbeforeunload = confirmExit;
function confirmExit() {
    return "You have attempted to leave this page. If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}

document.addEventListener("DOMContentLoaded", UIManager.onLoad);

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import "./styles/_index.scss"
import * as ReactDOM from "react-dom";
import {UIManager} from "./utils/UIManager";
import * as React from "react";
import {IncompatibleScreenSize} from "./components/IncompatibleScreenSize";

let needIncompatibleScreenSizeScreen = false;

setInterval(() => {
    needIncompatibleScreenSizeScreen = window.innerHeight < 880 || window.innerWidth < 1400;

    if (needIncompatibleScreenSizeScreen) {
        (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'block';
        ReactDOM.render((<IncompatibleScreenSize/>), document.querySelector("#topScreen"));
    } else {
        (document.querySelector('#topScreen') as HTMLDivElement).style.display = 'none';
        ReactDOM.unmountComponentAtNode((document.querySelector('#topScreen') as HTMLDivElement))
    }

}, 10)

document.addEventListener("DOMContentLoaded", UIManager.onLoad);

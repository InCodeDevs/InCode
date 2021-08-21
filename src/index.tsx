/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

if(localStorage.getItem("incode-editor.theme") === null){
    localStorage.setItem("incode-editor.theme", "dark")
}

if(localStorage.getItem("incode-editor.enableAnimations") === null){
    localStorage.setItem("incode-editor.enableAnimations", "true")
}

switch (localStorage.getItem("incode-editor.theme")){
    case "dark":
        require("./styles/themes/dark/_index.scss");
        break;
    case "light":
        require("./styles/themes/light/_index.scss");
        break;
    case "twitch":
        require("./styles/themes/twitch/_index.scss");
        break;
    case "discord":
        require("./styles/themes/discord/_index.scss");
        break;
    case "youtube":
        require("./styles/themes/youtube/_index.scss");
        break;
    case "vscode-dark":
        require("./styles/themes/vscode-dark/_index.scss");
        break;
    case "whatsapp":
        require("./styles/themes/whatsapp/_index.scss");
        break;
    default:
        require("./styles/themes/dark/_index.scss");
        break;
}

if(localStorage.getItem("incode-editor.enableAnimations") === "true"){
    require('./styles/animations/_index.scss')
}

require('./styles/incode.scss')

import * as ReactDOM from "react-dom";
import {UIManager} from "./utils/UIManager";
import * as React from "react";
import {IncompatibleScreen} from "./components/IncompatibleScreen";
import {ProjectTypeSelector} from "./components/ProjectTypeSelector";

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

// window.onbeforeunload = confirmExit;
function confirmExit() {
    return "You have attempted to leave this page. If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}

document.addEventListener("DOMContentLoaded", UIManager.onLoad);

function tempLoad() {
    ReactDOM.render((<ProjectTypeSelector/>), document.querySelector("#menu"))
}

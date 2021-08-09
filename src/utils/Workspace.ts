/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {BlocklyCompiler} from "../blockly/BlocklyCompiler";
import * as WebCompiler from "../incode/compiler/WebCompiler";
import {Options} from "../Options";
import {Networking} from "./Networking";

export class Workspace {

    public static compile(dl: boolean = true) {
        let code = ""
        if(Options.currentEditor != ''){
            if (Options.currentEditor === 'vscode') {
                // @ts-ignore
                code = window.editor.getValue();
            } else {
                code = new BlocklyCompiler().compile();
            }

            console.log("Code: \n\n" + code)

            code = WebCompiler.WebCompiler.compile(code);

            Options.currentLiveJS = btoa(code);

            console.log(Options.currentLiveJS)

            if(dl){
                Networking.download("Programm.js", code)
            }
        }
    }

    public static preview = () => {
        if(Options.currentEditor != '' && Options.enableLivePreview){
            Workspace.compile(false);
            if(document.getElementById('livePreviewFrame') != undefined){
                (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
            }
            let previewFrame = document.createElement('iframe');
            previewFrame.src = 'preview.html?code=' + Options.currentLiveJS;
            previewFrame.id = 'livePreviewFrame';
            (document.getElementById('livePreview') as HTMLDivElement).appendChild(previewFrame);
        }
    }
}

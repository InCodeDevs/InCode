import "./styles/_index.scss"

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Blockly from 'blockly';
import * as DE from 'blockly/msg/de';
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
import * as DarkTheme from './blockly/themes/BlocklyDark'
import * as monaco from 'monaco-editor'
import * as WebCompiler from './incode/compiler/WebCompiler'

import {MainMenu} from "./components/MainMenu";
import {StartBlock} from "./blockly/blocks/StartBlock";
import {LogBlock} from "./blockly/blocks/LogBlock";
import {AskBlock} from "./blockly/blocks/AskBlock";
import {AddToScreenBlock} from "./blockly/blocks/AddToScreenBlock";
import {AddToElementBlock} from "./blockly/blocks/AddToElementBlock";
import {CreateMethodBlock} from "./blockly/blocks/CreateMethodBlock";
import {CallMethodBlock} from "./blockly/blocks/CallMethodBlock";
import {CreateVarBlock} from "./blockly/blocks/CreateVarBlock";
import {CreateVarTypeBlock} from "./blockly/blocks/CreateVarTypeBlock";
import {SetVarValueBlock} from "./blockly/blocks/SetVarValueBlock";
import {SetVarValueNumberBlock} from "./blockly/blocks/SetVarValueNumberBlock";
import {SetVarTextBlock} from "./blockly/blocks/SetVarTextBlock";
import {SetVarColorBlock} from "./blockly/blocks/SetVarColorBlock";
import {RepeatXTimesBlock} from "./blockly/blocks/RepeatXTimesBlock";
import {RepeatWhile} from "./blockly/blocks/RepeatWhile";
import {RepeatWhileNumber} from "./blockly/blocks/RepeatWhileNumber";
import {IfTextBlock} from "./blockly/blocks/IfTextBlock";
import {IfNumberBlock} from "./blockly/blocks/IfNumberBlock";
import {IfEventBlock} from "./blockly/blocks/IfEventBlock";
import {ElseIfTextBlock} from "./blockly/blocks/ElseIfTextBlock";
import {ElseIfNumberBlock} from "./blockly/blocks/ElseIfNumberBlock";
import {ElseBlock} from "./blockly/blocks/ElseBlock";
import {Block} from "blockly/blockly";
import {MenuBar} from "./components/MenuBar";
import {InCodeLanguage} from "./monaco/languages/InCodeLanguage";

export class Options {
    public static enableLivePreview = false;
    public static currentLiveJS = '';
    public static currentEditor = '';
    public static recompileInterval = 4000;
}

export const preview = () => {
    if(Options.currentEditor != '' && Options.enableLivePreview){
        compileWS(false);
        if(document.getElementById('livePreviewFrame') != undefined){
            (document.getElementById('livePreview') as HTMLDivElement).removeChild((document.getElementById('livePreviewFrame') as HTMLIFrameElement))
        }
        let previewFrame = document.createElement('iframe');
        previewFrame.src = 'preview.html?code=' + Options.currentLiveJS;
        previewFrame.id = 'livePreviewFrame';
        (document.getElementById('livePreview') as HTMLDivElement).appendChild(previewFrame);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const menuContainer = document.querySelector("#menu");
    const menuBarContainer = document.querySelector("#menuBar");

    ReactDOM.render((<MainMenu/>), menuContainer);
    ReactDOM.render((<MenuBar/>), menuBarContainer);

    hideMenuBar();
    showMenu();

    deleteBlockly();
    deleteMonaco();
});

export const compileWS = (dl: boolean = true) => {
    let code = ""
    if(Options.currentEditor != ''){
        if (Options.currentEditor === 'vscode') {
            // @ts-ignore
            code = window.editor.getValue();
        } else {
            Blockly.getMainWorkspace().getAllBlocks(true).forEach(block => {
                console.log(block.parentBlock_)
                let c = getPreTabs(block);
                block.inputList.forEach(i => {
                    i.fieldRow.forEach(r => {
                        if(r.value_ != "Start"){
                            c += r.value_ + " "
                        }
                    })
                })
                code += c + "\n"
            })
        }

        console.log(code)

        code = WebCompiler.WebCompiler.compile(code);

        Options.currentLiveJS = btoa(code);

        console.log(Options.currentLiveJS)

        if(dl){
            download("Programm.ic", code)
        }
    }
}

export const remakeSizes = () => {
    if (!Options.enableLivePreview) {
        (document.getElementById('blockly') as HTMLDivElement).style.width = "100%";
        (document.getElementById('monaco') as HTMLDivElement).style.width = "100%";
    } else {
        (document.getElementById('blockly') as HTMLDivElement).style.width = "55%";
        (document.getElementById('monaco') as HTMLDivElement).style.width = "55%";
        (document.getElementById('livePreview') as HTMLDivElement).style.width = "45%";
    }
}

export const createBlockly = () => {
    Options.currentEditor = 'blockly'
    remakeSizes();
    (document.getElementById('blockly') as HTMLDivElement).style.display = 'block'
    StartBlock.registerBlock();

    LogBlock.registerBlock();
    AskBlock.registerBlock();
    AddToScreenBlock.registerBlock();
    AddToElementBlock.registerBlock();

    CreateMethodBlock.registerBlock();
    CallMethodBlock.registerBlock();

    CreateVarBlock.registerBlock();
    CreateVarTypeBlock.registerBlock();
    SetVarValueBlock.registerBlock();
    SetVarValueNumberBlock.registerBlock();
    SetVarTextBlock.registerBlock();
    SetVarColorBlock.registerBlock();

    RepeatXTimesBlock.registerBlock()
    RepeatWhile.registerBlock();
    RepeatWhileNumber.registerBlock();

    IfTextBlock.registerBlock();
    IfNumberBlock.registerBlock();
    IfEventBlock.registerBlock();
    ElseIfTextBlock.registerBlock();
    ElseIfNumberBlock.registerBlock();
    ElseBlock.registerBlock();

    Blockly.setLocale(DE)

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            theme: DarkTheme.default,
            renderer: 'zelos'
        });
}

export const deleteBlockly = () => {
    (document.getElementById('blocklyDiv') as HTMLDivElement).childNodes.forEach(c => {
        (document.getElementById('blocklyDiv') as HTMLDivElement).removeChild(c)
    });
    (document.getElementById('blockly') as HTMLDivElement).style.display = 'none'
}

export const createMonaco = () => {
    Options.currentEditor = 'vscode'
    remakeSizes();
    (document.getElementById('monaco') as HTMLDivElement).style.display = 'block'
    // @ts-ignore
    self.MonacoEnvironment = {
        getWorkerUrl: function (moduleId: string, label: string) {
            if (label === 'json') {
                return './json.worker.bundle.js';
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return './css.worker.bundle.js';
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return './html.worker.bundle.js';
            }
            if (label === 'typescript' || label === 'javascript') {
                return './ts.worker.bundle.js';
            }
            return './editor.worker.bundle.js';
        }
    };

    InCodeLanguage.register();

    // @ts-ignore
    window.editor = monaco.editor.create((document.getElementById('monaco') as HTMLDivElement), {
        value: 'Gib "Hallo Welt" in der Konsole aus.',
        language: 'incode',
        theme: "incode-lang-theme",
        insertSpaces: false,
        autoClosingQuotes: "always",
        acceptSuggestionOnEnter: "on",
        fontSize: 25
    });
}

export const deleteMonaco = () => {
    (document.getElementById('monaco') as HTMLDivElement).childNodes.forEach(c => {
        (document.getElementById('monaco') as HTMLDivElement).removeChild(c)
    });
    (document.getElementById('monaco') as HTMLDivElement).style.display = 'none'
}

export const showMenuBar = () => {
    (document.getElementById('menuBar') as HTMLDivElement).style.display = 'block'
}

export const hideMenuBar = () => {
    (document.getElementById('menuBar') as HTMLDivElement).style.display = 'none'
}

export const showMenu = () => {
    (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
    Options.currentEditor = '';
}

export const hideMenu = () => {
    (document.getElementById('menu') as HTMLDivElement).style.display = 'none'
}


const getPreTabs = (block: Block): string => {
    let tabs = 0;
    let currentElement = block;
    while (currentElement.parentBlock_) {
        let hasStatementInput = false;
        currentElement.inputList.forEach(i => {
            hasStatementInput = i.type == 3;
        })
        if(hasStatementInput){
            tabs++;
        }
        currentElement = currentElement.parentBlock_;
    }
    let c = "";
    for (let i = 0; i < tabs; i++) {
        c += "\t";
    }
    return c;
}

function download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

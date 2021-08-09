/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as ReactDOM from "react-dom";
import {MainMenu} from "../components/MainMenu";
import {MenuBar} from "../components/MenuBar";
import * as React from "react";
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
import {Options} from "../Options";
import {StartBlock} from "../blockly/blocks/StartBlock";
import {LogBlock} from "../blockly/blocks/LogBlock";
import {AskBlock} from "../blockly/blocks/AskBlock";
import {AddToScreenBlock} from "../blockly/blocks/AddToScreenBlock";
import {AddToElementBlock} from "../blockly/blocks/AddToElementBlock";
import {CreateMethodBlock} from "../blockly/blocks/CreateMethodBlock";
import {CallMethodBlock} from "../blockly/blocks/CallMethodBlock";
import {CreateVarBlock} from "../blockly/blocks/CreateVarBlock";
import {CreateVarTypeBlock} from "../blockly/blocks/CreateVarTypeBlock";
import {SetVarValueBlock} from "../blockly/blocks/SetVarValueBlock";
import {SetVarValueNumberBlock} from "../blockly/blocks/SetVarValueNumberBlock";
import {SetVarTextBlock} from "../blockly/blocks/SetVarTextBlock";
import {SetVarColorBlock} from "../blockly/blocks/SetVarColorBlock";
import {RepeatXTimesBlock} from "../blockly/blocks/RepeatXTimesBlock";
import {RepeatWhile} from "../blockly/blocks/RepeatWhile";
import {RepeatWhileNumber} from "../blockly/blocks/RepeatWhileNumber";
import {IfTextBlock} from "../blockly/blocks/IfTextBlock";
import {IfNumberBlock} from "../blockly/blocks/IfNumberBlock";
import {IfEventBlock} from "../blockly/blocks/IfEventBlock";
import {ElseIfTextBlock} from "../blockly/blocks/ElseIfTextBlock";
import {ElseIfNumberBlock} from "../blockly/blocks/ElseIfNumberBlock";
import {ElseBlock} from "../blockly/blocks/ElseBlock";
import * as Blockly from "blockly";
import * as DE from "blockly/msg/de";
import * as DarkTheme from "../blockly/themes/BlocklyDark";
import {InCodeLanguage} from "../monaco/languages/InCodeLanguage";
import * as monaco from "monaco-editor";
import {ChooseEditorMenu} from "../components/ChooseEditorMenu";

export class UIManager {

    public static onLoad() {
        const menuContainer = document.querySelector("#menu");
        const menuBarContainer = document.querySelector("#menuBar");

        ReactDOM.render((<ChooseEditorMenu/>), menuContainer);
        ReactDOM.render((<MenuBar/>), menuBarContainer);

        UIManager.hideMenuBar();
        UIManager.showMenu();

        UIManager.deleteBlockly();
        UIManager.deleteMonaco();
    }

    public static deleteMonaco = () => {
        (document.getElementById('monaco') as HTMLDivElement).childNodes.forEach(c => {
            (document.getElementById('monaco') as HTMLDivElement).removeChild(c)
        });
        (document.getElementById('monaco') as HTMLDivElement).style.display = 'none'
    }

    public static showMenuBar = () => {
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'block'
    }

    public static hideMenuBar = () => {
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'none'
    }

    public static showMenu = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        Options.currentEditor = '';
    }

    public static hideMenu = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'none'
    }

    public static createBlockly = () => {
        Options.currentEditor = 'blockly'
        UIManager.remakeSizes();
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

    public static deleteBlockly = () => {
        (document.getElementById('blocklyDiv') as HTMLDivElement).childNodes.forEach(c => {
            (document.getElementById('blocklyDiv') as HTMLDivElement).removeChild(c)
        });
        (document.getElementById('blockly') as HTMLDivElement).style.display = 'none'
    }

    public static createMonaco = () => {
        Options.currentEditor = 'vscode'
        UIManager.remakeSizes();
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
            value: 'Erstelle x als Knopf\nSetze den Text von x auf "Klick mich"\nFüge x zum Bildschirm hinzu',
            language: 'incode',
            theme: "incode-lang-theme",
            insertSpaces: false,
            autoClosingQuotes: "always",
            acceptSuggestionOnEnter: "on",
            fontSize: 25
        });
    }

    public static remakeSizes = () => {
        if (!Options.enableLivePreview) {
            (document.getElementById('blockly') as HTMLDivElement).style.width = "100%";
            (document.getElementById('monaco') as HTMLDivElement).style.width = "100%";
        } else {
            (document.getElementById('blockly') as HTMLDivElement).style.width = "55%";
            (document.getElementById('monaco') as HTMLDivElement).style.width = "55%";
            (document.getElementById('livePreview') as HTMLDivElement).style.width = "45%";
        }
    }

}

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
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
import {EditorSelector} from "../components/EditorSelector";
import {TemplateSelector} from "../components/TemplateSelector";
import {ProjectSelector} from "../components/ProjectSelector";
import {IPosition, Position} from "monaco-editor";

export class UIManager {

    /**
     * Loads all basic components and renders the Main Menu
     */
    public static onLoad() {

        const menuContainer = document.querySelector("#menu");
        const menuBarContainer = document.querySelector("#menuBar");

        ReactDOM.render((<MainMenu/>), menuContainer);
        ReactDOM.render((<MenuBar/>), menuBarContainer);

        UIManager.hideMenuBar();
        UIManager.showMainMenu();

        UIManager.deleteBlockly();
        UIManager.deleteMonaco();

        (document.querySelector('#copyright') as HTMLDivElement).addEventListener('click', (e) => {
            UIManager.alert("<h1>InCode-Editor</h1>" +
                "<span><strong>By:</strong> <span style='font-family: monospace'>The InCode Developers</span><br>" +
                "<strong>Version:</strong> <span style='font-family: monospace'>Beta 2.1.0</span><br>" +
                "<strong>License:</strong> <span style='font-family: monospace'>GNU General Public License 3.0</span><br>" +
                "<a href='https://github.com/InCodeDevs/InCode-Editor' target='_blank'>GitHub</a>\t<a href='https://incodedevs.github.io/InCode-Editor' target='_blank'>Website</a></span>"
            )
        })
    }

    /**
     * Removes the monaco (vscode) editor
     */
    public static deleteMonaco = () => {
        (document.getElementById('monaco') as HTMLDivElement).childNodes.forEach(c => {
            (document.getElementById('monaco') as HTMLDivElement).removeChild(c)
        });
        (document.getElementById('monaco') as HTMLDivElement).style.display = 'none'
    }

    /**
     * Shows the Menu Bar
     */
    public static showMenuBar = () => {
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'block'
    }

    /**
     * Hides the Menu Bar
     */
    public static hideMenuBar = () => {
        (document.getElementById('menuBar') as HTMLDivElement).style.display = 'none'
    }

    /**
     * Shows the current Menu
     * may be removed.
     */
    public static showCurrentMenu = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        Options.currentEditor = '';
    }

    /**
     * Shows the Main Menu
     * may be removed.
     */
    public static showMainMenu = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        ReactDOM.unmountComponentAtNode((document.querySelector('#menu') as HTMLDivElement))
        ReactDOM.render((<MainMenu />), document.querySelector('#menu'));
        Options.currentEditor = '';
    }

    /**
     * Hides the menu
     * may be removed.
     */
    public static hideMenu = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'none'
    }

    /**
     * Shows the Menu
     */
    public static showEditorSelector = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        ReactDOM.unmountComponentAtNode((document.querySelector('#menu') as HTMLDivElement))
        ReactDOM.render((<EditorSelector />), document.querySelector('#menu'));
    }

    /**
     * Shows the Menu
     */
    public static showTemplateSelector = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        ReactDOM.unmountComponentAtNode((document.querySelector('#menu') as HTMLDivElement))
        ReactDOM.render((<TemplateSelector />), document.querySelector('#menu'));
    }

    /**
     * Shows the Menu
     */
    public static showProjectSelector = () => {
        (document.getElementById('menu') as HTMLDivElement).style.display = 'block'
        ReactDOM.unmountComponentAtNode((document.querySelector('#menu') as HTMLDivElement))
        ReactDOM.render((<ProjectSelector />), document.querySelector('#menu'));
    }

    /**
     * Creates the blockly editor
     */
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

    /**
     * Removes the blockly editor
     */
    public static deleteBlockly = () => {
        (document.getElementById('blocklyDiv') as HTMLDivElement).childNodes.forEach(c => {
            (document.getElementById('blocklyDiv') as HTMLDivElement).removeChild(c)
        });
        (document.getElementById('blockly') as HTMLDivElement).style.display = 'none'
    }

    /**
     * Creates the monaco (vscode) editor
     */
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
            value: '',
            language: 'incode',
            theme: "incode-lang-theme",
            insertSpaces: false,
            autoClosingQuotes: "always",
            autoClosingBrackets: "always",
            acceptSuggestionOnEnter: "on",
            contextmenu: false,
            fontSize: 25,
        });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            let docURL = "";
            let tutURL = "https://incode.craftions.net/docs/Tutorials/";

            if(((e.target as HTMLElement).classList as DOMTokenList).contains("mtk24") && ((e.target as HTMLElement).classList as DOMTokenList).contains("mtkb")){
                docURL = "https://incode.craftions.net/docs/Bezug/Befehle/";
            } else if(((e.target as HTMLElement).classList as DOMTokenList).contains("mtk29")){
                docURL = "https://incode.craftions.net/docs/Bezug/Typen/"
            } else if(((e.target as HTMLElement).classList as DOMTokenList).contains("mtk22")){
                docURL = "https://incode.craftions.net/docs/Bezug/Eigenschaften/"
            }

            if(docURL != ""){

                let hasDocumentation    = false;
                let hasTutorial         = false;

                let x0 = new XMLHttpRequest();
                x0.open("GET", docURL + (e.target as HTMLElement).innerText, true);
                x0.send(null);


                x0.onreadystatechange = () => {
                    if(x0.readyState != 4) return;

                    if(x0.status === 200){
                        hasDocumentation = true;
                    }

                    let x1 = new XMLHttpRequest();
                    x1.open("GET", tutURL + (e.target as HTMLElement).innerText, true);
                    x1.send(null);
                    x1.onreadystatechange = () => {
                        if(x1.readyState != 4) return;

                        if(x1.status === 200){
                            hasTutorial = true;
                        }

                        if(hasDocumentation && !hasTutorial){
                            UIManager.ask(
                                "<h1 style='text-align: center'>Dokumentation gefunden</h1>" +
                                "<h4 style='text-align: center'>Willst du dir die Dokumentation zu '" + (e.target as HTMLElement).innerText + "' anschauen?</h4>",
                                () => {
                                    window.open(docURL + (e.target as HTMLElement).innerText, "_blank")
                                }
                            )
                        }else if(hasTutorial && !hasDocumentation){
                            UIManager.ask(
                                "<h1 style='text-align: center'>Tutorial gefunden</h1>" +
                                "<h4 style='text-align: center'>Willst du dir das Tutorial zu '" + (e.target as HTMLElement).innerText + "' anschauen?</h4>",
                                () => {
                                    window.open(tutURL + (e.target as HTMLElement).innerText, "_blank")
                                }
                            )
                        } else if(hasDocumentation && hasTutorial){
                            UIManager.alert(
                                "<h1 style='text-align: center'>Dokumentation und Tutorial gefunden</h1>" +
                                "<div style='text-align: center; margin-top: 4%;'>" +
                                "<h3><a href='" + docURL + (e.target as HTMLElement).innerText + "' target='_blank' style='color: #FF7700'>Dokumentation öffnen</a></h3>" +
                                "<h3 style='margin-top: 3%;'><a href='" + tutURL + (e.target as HTMLElement).innerText + "' target='_blank' style='color: #FF7700'>Tutorial öffnen</a></h3>" +
                                "</div>")
                        }
                    }
                }

            }
        })
    }

    /**
     * Sets the sizes of everything
     */
    public static remakeSizes = () => {
        (document.getElementById('blockly') as HTMLDivElement).style.width = "55%";
        (document.getElementById('monaco') as HTMLDivElement).style.width = "55%";
        (document.getElementById('livePreview') as HTMLDivElement).style.width = "45%";
    }

    private static prompt0CallBack = (value: string) => {
    };
    private static alert0CallBack = () => {
    };
    private static question0CallBack = () => {
    };

    /**
     * Alert a message
     * @param msg The message that should be printed
     * @param callback The function that will be called after the alert is finished.
     */
    public static alert(msg: string, callback: () => void = () => {
    }) {
        (document.querySelector(".alert-popup") as HTMLDivElement).style.display = 'block';
        (document.querySelector(".alert-popup-content") as HTMLDivElement).innerHTML = msg;
        UIManager.alert0CallBack = callback;
        (document.querySelector(".alert-popup-button-confirm") as HTMLButtonElement).addEventListener('click', UIManager.handleAlert0, true)
    }

    /**
     * Prompt a question
     * @param msg The question that should be printed
     * @param callback The function that will be called after the prompt is finished. Will be called with the answer
     */
    public static prompt(msg: string, callback: (value: string) => void) {
        UIManager.prompt0CallBack = callback;
        (document.querySelector(".prompt-popup") as HTMLDivElement).style.display = 'block';
        (document.querySelector(".prompt-popup-input") as HTMLInputElement).value = '';
        (document.querySelector(".prompt-popup-content-text") as HTMLDivElement).innerHTML = msg;
        (document.querySelector(".prompt-popup-button-confirm") as HTMLButtonElement).addEventListener('click', UIManager.handlePrompt0, true)
    }

    /**
     * Prompt a question
     * @param msg The question that should be printed
     * @param callback The function that will be called after the prompt is finished. Will be called with the answer
     */
    public static ask(msg: string, callback: () => void) {
        UIManager.question0CallBack = callback;
        (document.querySelector(".question-popup") as HTMLDivElement).style.display = 'block';
        (document.querySelector(".question-popup-content-text") as HTMLDivElement).innerHTML = msg;
        (document.querySelector(".question-popup-button-confirm") as HTMLButtonElement).addEventListener('click', UIManager.handleAsk0, true)
    }


    private static handlePrompt0(e: MouseEvent) {
        console.log("Hello World");
        (document.querySelector(".prompt-popup-button-confirm") as HTMLButtonElement).removeEventListener('click', UIManager.handlePrompt0, true)
        UIManager.prompt0CallBack((document.querySelector('.prompt-popup-input') as HTMLInputElement).value);
    }

    private static handleAlert0() {
        (document.querySelector(".alert-popup-button-confirm") as HTMLButtonElement).removeEventListener('click', UIManager.handleAlert0, true)
        UIManager.alert0CallBack()
    }

    private static handleAsk0() {
        (document.querySelector(".question-popup-button-confirm") as HTMLButtonElement).removeEventListener('click', UIManager.handleAsk0, true)
        UIManager.question0CallBack()
    }

    /**
     * Hides all open Popups (alert, prompt and question/ask)
     */
    public static hideAllPopups(){
        document.querySelectorAll(".popup").forEach(s => {
            (s as HTMLDivElement).style.display = 'none';
        })
    }
}

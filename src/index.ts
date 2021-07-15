import "./styles/_index.scss"

import * as Blockly from 'blockly';
import * as DE from 'blockly/msg/de';
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
import * as DarkTheme from './themes/dark'

import {StartBlock} from "./blocks/StartBlock";
import {LogBlock} from "./blocks/LogBlock";
import {AskBlock} from "./blocks/AskBlock";
import {AddToScreenBlock} from "./blocks/AddToScreenBlock";
import {AddToElementBlock} from "./blocks/AddToElementBlock";
import {CreateMethodBlock} from "./blocks/CreateMethodBlock";
import {CallMethodBlock} from "./blocks/CallMethodBlock";
import {CreateVarBlock} from "./blocks/CreateVarBlock";
import {CreateVarTypeBlock} from "./blocks/CreateVarTypeBlock";
import {SetVarValueBlock} from "./blocks/SetVarValueBlock";
import {SetVarValueNumberBlock} from "./blocks/SetVarValueNumberBlock";
import {SetVarTextBlock} from "./blocks/SetVarTextBlock";
import {SetVarColorBlock} from "./blocks/SetVarColorBlock";
import {RepeatXTimesBlock} from "./blocks/RepeatXTimesBlock";
import {RepeatWhile} from "./blocks/RepeatWhile";
import {RepeatWhileNumber} from "./blocks/RepeatWhileNumber";
import {IfTextBlock} from "./blocks/IfTextBlock";
import {IfNumberBlock} from "./blocks/IfNumberBlock";
import {IfEventBlock} from "./blocks/IfEventBlock";
import {ElseIfTextBlock} from "./blocks/ElseIfTextBlock";
import {ElseIfNumberBlock} from "./blocks/ElseIfNumberBlock";
import {ElseBlock} from "./blocks/ElseBlock";
import {Block} from "blockly/blockly";

document.addEventListener("DOMContentLoaded", function () {

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

    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 59){
            compileWS()
        }
    })
});

const compileWS = () => {
    let code = ""
    Blockly.getMainWorkspace().getAllBlocks(true).forEach(block => {
        let c = getPreTabs(block);
        block.inputList.forEach(i => {
            i.fieldRow.forEach(r => {
                c += r.value_ + " "
            })
        })
        code += c + "\n"
    })
    download("Programm.ic", code)
}

const getPreTabs = (block: Block): string => {
    let tabs = 0;
    let currentElement = block;
    while(currentElement.parentBlock_){
        tabs++;
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
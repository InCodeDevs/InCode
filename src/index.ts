import "./styles/_index.scss"

import * as Blockly from 'blockly';
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

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            sounds: true,
            theme: DarkTheme.default
        });
});

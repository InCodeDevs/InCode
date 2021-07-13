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

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            sounds: true,
            theme: DarkTheme.default
        });
});

import "./styles/_index.scss"

import * as Blockly from 'blockly';
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
import * as DarkTheme from './themes/dark'
import {StartBlock} from "./blocks/StartBlock";
import {LogBlock} from "./blocks/LogBlock";
import {AskBlock} from "./blocks/AskBlock";

document.addEventListener("DOMContentLoaded", function () {

    StartBlock.registerBlock();
    LogBlock.registerBlock();
    AskBlock.registerBlock();

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            sounds: true,
            theme: DarkTheme.default
        });
});

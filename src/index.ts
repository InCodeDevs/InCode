import "./styles/_index.scss"

import * as Blockly from 'blockly';
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;
import {StartBlock} from "./blocks/StartBlock";

document.addEventListener("DOMContentLoaded", function () {

    StartBlock.registerBlock();

    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            media: 'media/'
        });
});

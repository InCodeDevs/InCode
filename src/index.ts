import "./styles/_index.scss"

import * as Blockly from 'blockly';
import ToolboxDefinition = Blockly.utils.toolbox.ToolboxDefinition;

document.addEventListener("DOMContentLoaded", function () {
    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox') as ToolboxDefinition,
            media: 'media/'
        });
});

/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from 'blockly';

export class SetVarTextBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "var_set_text",
                "message0": "Setze den Text von %1 auf \"%2\"",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_input",
                        "name": "VALUE",
                        "text": "Text"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 30,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

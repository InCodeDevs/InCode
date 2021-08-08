/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from 'blockly';

export class ElseBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "else",
                "message0": "Sonst %1",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "STATEMENT"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": '#5577EE',
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

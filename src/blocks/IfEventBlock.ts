/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from "blockly";

export class IfEventBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "if_event",
                "message0": "Wenn %1 %2 führe die Methode %3 aus",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "EVENT",
                        "options": [
                            [
                                "Gedrück",
                                "PRESSED"
                            ],
                            [
                                "Berührt",
                                "HOVERED"
                            ],
                            [
                                "Nicht Berührt",
                                "NOT_HOVERED"
                            ]
                        ]
                    },
                    {
                        "type": "field_input",
                        "name": "METHOD:NAME",
                        "text": "methodenName"
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

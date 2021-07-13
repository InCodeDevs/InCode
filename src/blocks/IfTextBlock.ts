/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from 'blockly'

export class IfTextBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "if_text",
                "message0": "Wenn %1 %2 %3 ist %4",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "OPERATOR",
                        "options": [
                            [
                                "Gleich",
                                "EQUALS"
                            ],
                            [
                                "Kleiner",
                                "SMALLER"
                            ],
                            [
                                "Größer",
                                "BIGGER"
                            ],
                            [
                                "Kleiner oder gleich",
                                "SMALLER_EQUALS"
                            ],
                            [
                                "Größer oder gleich",
                                "BIGGER_EQUALS"
                            ]
                        ]
                    },
                    {
                        "type": "field_input",
                        "name": "VALUE",
                        "text": "Text"
                    },
                    {
                        "type": "input_statement",
                        "name": "EXEC_STATEMENT"
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

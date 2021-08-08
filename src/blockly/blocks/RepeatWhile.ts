/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class RepeatWhile {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "repeat_while",
                "message0": "Wiederhole solange %1 %2 %3 ist %4",
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
                                "gleich"
                            ],
                            [
                                "Nicht gleich",
                                "nicht-gleich"
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
                        "name": "STATEMENT"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 210,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

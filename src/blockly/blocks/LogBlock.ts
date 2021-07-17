/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from "blockly";

export class LogBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "log",
                "message0": "Gib %1 in der %2 aus",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "MESSAGE",
                        "text": "eine Nachricht"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "OUTPUT",
                        "options": [
                            [
                                "Konsole",
                                "CONSOLE"
                            ],
                            [
                                "Dialogbox",
                                "DIALOG_BOX"
                            ]
                        ]
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 120,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

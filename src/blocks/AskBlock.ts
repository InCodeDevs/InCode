/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class AskBlock {
    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "ask",
                "message0": "Frage %1 und speicher die Antwort in %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "QUESTION",
                        "text": "eine Frage"
                    },
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
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

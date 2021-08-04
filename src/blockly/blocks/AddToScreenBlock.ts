/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class AddToScreenBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "add_to_screen",
                "message0": "Füge %1 zum Bildschirm hinzu",
                "args0": [
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
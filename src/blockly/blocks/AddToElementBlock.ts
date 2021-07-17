/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class AddToElementBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "add_to_element",
                "message0": "Füge %1 zu %2 hinzu",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "CHILD",
                        "text": "x"
                    },
                    {
                        "type": "field_input",
                        "name": "PARENT",
                        "text": "y"
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

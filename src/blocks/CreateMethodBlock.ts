/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class CreateMethodBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "create_method",
                "message0": "Erstelle die Methode %1",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "METHOD_NAME",
                        "text": "methodenName"
                    }
                ],
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

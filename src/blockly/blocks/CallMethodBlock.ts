/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class CallMethodBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "call_method",
                "message0": "Rufe die Methode %1 auf",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "METHOD_NAME",
                        "text": "methodenName"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

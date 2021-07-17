/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from 'blockly'

export class RepeatXTimesBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "repeat_x_times",
                "message0": "Wiederhole %1 mal %2",
                "args0": [
                    {
                        "type": "field_number",
                        "name": "TIMES",
                        "value": 0
                    },
                    {
                        "type": "input_statement",
                        "name": "REPEAT_STATEMENT"
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

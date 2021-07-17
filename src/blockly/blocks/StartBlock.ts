/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as Blockly from 'blockly'

export class StartBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "start",
                "message0": "Start",
                "nextStatement": null,
                "colour": 210,
            }
        ]);
    }
}

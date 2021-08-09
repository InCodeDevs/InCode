/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import * as Blockly from "blockly";

export class SetVarValueNumberBlock {

    public static registerBlock(){
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "var_set_value_number",
                "message0": "Setze den Wert von %1 auf %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_number",
                        "name": "VALUE",
                        "value": 0
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 30,
                "tooltip": "",
                "helpUrl": ""
            }
        ])
    }
}

/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class SetVarColorBlock {

    public static registerBlock() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "var_set_color",
                "message0": "Setze die Farbe von %1 auf %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "COLOR",
                        "options": [
                            [
                                "Schwarz",
                                "Schwarz"
                            ],
                            [
                                "Weiß",
                                "Weiß"
                            ],
                            [
                                "Blau",
                                "Blau"
                            ],
                            [
                                "Grün",
                                "Grün"
                            ],
                            [
                                "Gelb",
                                "Gelb"
                            ],
                            [
                                "Grau",
                                "Grau"
                            ]
                        ]
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

/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
import * as Blockly from "blockly";

export class CreateVarTypeBlock {

    public static registerBlock() {

        Blockly.defineBlocksWithJsonArray([
            {
                "type": "var_create_type",
                "message0": "Erstelle %1 als %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "VARIABLE_NAME",
                        "text": "x"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "VARIABLE_TYPE",
                        "options": [
                            [
                                "Knopf",
                                "BUTTON"
                            ],
                            [
                                "Absatz",
                                "PARAGRAPH"
                            ],
                            [
                                "Text",
                                "SPAN"
                            ],
                            [
                                "Bild",
                                "IMG"
                            ],
                            [
                                "Überschrift",
                                "H1"
                            ],
                            [
                                "Eingabefeld",
                                "INPUT"
                            ],
                            [
                                "Tabelle",
                                "TABLE"
                            ],
                            [
                                "Zeile",
                                "TR"
                            ],
                            [
                                "Spalte",
                                "TB"
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

/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as Blockly from "blockly";

export class RepeatWhileNumber {
  /**
   * Registers the "RepeatWhileNumber" block to the blockly registry
   */
  public static registerBlock() {
    Blockly.defineBlocksWithJsonArray([
      {
        type: "repeat_while_number",
        message0: "Wiederhole solange %1 %2 %3 ist %4",
        args0: [
          {
            type: "field_input",
            name: "VARIABLE_NAME",
            text: "x",
          },
          {
            type: "field_dropdown",
            name: "OPERATOR",
            options: [
              ["Gleich", "gleich"],
              ["Kleiner", "kleiner"],
              ["Größer", "größer"],
              ["Kleiner oder gleich", "kleiner-gleich"],
              ["Größer oder gleich", "größer-gleich"],
            ],
          },
          {
            type: "field_number",
            name: "NAME",
            value: 0,
          },
          {
            type: "input_statement",
            name: "STATEMENT",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 210,
        tooltip: "",
        helpUrl: "",
      },
    ]);
  }
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { BlocklyCompiler } from "./BlocklyCompiler";
import Blockly from "blockly";

export default class Workspace {
  public static getCode(blocklyXml: boolean = true): string {
    // @ts-ignore
    if (window.editor) {
      // @ts-ignore
      return window.editor.getValue();
    } else {
      if (blocklyXml) {
        return Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).outerHTML;
      } else {
        return new BlocklyCompiler().compile();
      }
    }
  }
}
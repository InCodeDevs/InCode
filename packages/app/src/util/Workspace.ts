/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { BlocklyCompiler } from "./BlocklyCompiler";
import Blockly from "blockly";
import { Compiler } from "@incodelang/compiler/dist/esm/module/Compiler";

export default class Workspace {
  public static getCode(blocklyXml: boolean = true): string {
    // @ts-ignore
    if (window.editor) {
      // @ts-ignore
      return window.editor.getValue().replace(/\r\n/g, "\n");
    } else {
      if (blocklyXml) {
        return Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).outerHTML;
      } else {
        return new BlocklyCompiler().compile();
      }
    }
  }

  public static isBlockly(): boolean {
    // @ts-ignore
    return !window.editor;
  }

  public static reloadLivePreview(): void {
    let jsCode = Compiler.compile(Workspace.getCode(false));
    (
      document.getElementsByName(
        "playground-preview-frame"
      )[0] as HTMLIFrameElement
    ).srcdoc = `<!DOCTYPE html><html lang='de'><head><title>InCode Projekt</title></head><body><script>${jsCode}</script></body></html>`;
  }
}

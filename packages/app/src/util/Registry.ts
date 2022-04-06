/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

// Register Set
// 0x01 : monaco editor instance
// 0x052: Current Project Config
// 0x053: Current Project Type
// 0x064: blockly workspace instance
// 0x072: boolean if the monaco editor should publish the new code data
//

import { JSONObject } from "../types/JSONObject";

export class Registry {
  private static options: JSONObject = {};

  public static putRegister(register: number, content: any): void {
    this.options[register] = content;
  }

  public static getRegister(register: number): any {
    return this.options[register];
  }

  public static deleteRegister(register: number) {
    delete this.options[register];
  }
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

// Register Set
// 0x01 : monaco editor instance
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

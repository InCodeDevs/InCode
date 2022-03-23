/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface ProjectConfig {
  name: string;
  code: string;
  type: "code" | "blockly";
  publicData?: string;
}

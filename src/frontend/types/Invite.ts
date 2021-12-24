/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface Invite {
  from: string;
  project_name: string;
  project_type: "code" | "blockly";
  public_data: string;
  timestamp: string;
}

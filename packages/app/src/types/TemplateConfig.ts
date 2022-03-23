/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface TemplateConfig {
  name: string;
  type: "code" | "blocks";
  code: string;
  id?: string;
}

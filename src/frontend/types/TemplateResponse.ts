/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface TemplateResponse {
  error: boolean;
  id: string | null;
}

export interface TemplateResponseConfig {
  name: string;
  id: string;
  code: string;
  type: "code" | "blocks";
  author: string;
}

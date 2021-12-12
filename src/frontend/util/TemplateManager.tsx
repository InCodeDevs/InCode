/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { TemplateConfig } from "../types/TemplateConfig";

export default class TemplateManager {
  private static async getTemplates(): Promise<TemplateConfig[]> {
    return [];
  }
}

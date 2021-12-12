/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { ProjectConfig } from "../types/ProjectConfig";
import UserManager from "./UserManager";
import {
  TemplateResponse,
  TemplateResponseConfig,
} from "../types/TemplateResponse";

export default class TemplateManager {
  public static async shareTemplate(
    projectConfig: ProjectConfig,
    description: string = ""
  ): Promise<TemplateResponse> {
    const response = await (
      await fetch("/api/v1/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: UserManager.getUsername(),
          token: UserManager.getToken(),
          name: projectConfig.name,
          code: projectConfig.code,
          type: projectConfig.type,
          description: description,
        }),
      })
    ).json();

    if (response.error === true) {
      return {
        error: true,
        id: null,
      };
    } else {
      return {
        error: false,
        id: response.id,
      };
    }
  }

  public static async getTemplates(): Promise<TemplateResponseConfig[]> {
    const response = await (
      await fetch("/api/v1/templates/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (response.error === true) {
      return [];
    } else {
      return response.templates;
    }
  }

  public static async getTemplate(id: string): Promise<TemplateResponseConfig> {
    const response = await (
      await fetch(`/api/v1/templates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
    ).json();

    if (response.error === true) {
      return {
        id: response.id,
        name: response.name,
        code: response.code,
        type: response.type,
        author: response.author,
      };
    } else {
      return {
        id: response.id,
        name: response.name,
        code: response.code,
        type: response.type,
        author: response.author,
      };
    }
  }

  public static async deleteTemplate(id: string): Promise<boolean> {
    const response = await (
      await fetch(`/api/v1/templates`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          username: UserManager.getUsername(),
          token: UserManager.getToken(),
        }),
      })
    ).json();

    return response.error === true;
  }
}

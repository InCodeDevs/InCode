/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import PopupManager from "./PopupManager";
import l18n from "./l18n";
import { WebClient } from "@incodelang/accounts-client";
import { ProjectConfig } from "../types/ProjectConfig";
import UserManager from "./UserManager";
import UIManager from "./UIManager";
import ProjectEditor from "../views/Project/ProjectEditor";
import React from "react";

const client = new WebClient("");

export default class ProjectManager {
  public static checkProjectName(value: string): boolean {
    if (value.length < 4) {
      PopupManager.showPopup(
        "Alert",
        "error",
        l18n.translate("error.project.name.too.short"),
        () => {},
        true
      );
    }
    return value.length >= 4;
  }

  public static async createProject(
    config: ProjectConfig,
    callback: (success: boolean) => void
  ) {
    const data = await client.getData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      "projects." + config.name
    );
    if (this.isEmptyResponse(data)) {
      let currentProjects = await client.getData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects"
      );

      let projects: any[] = [];

      try {
        projects = JSON.parse(currentProjects);
      } catch (e) {
        if (currentProjects === "The data was not found.") {
          projects = [];
        } else {
          projects = currentProjects;
        }
        console.log(projects);
      }

      projects.push(config.name);
      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        projects,
        "projects"
      );

      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        config,
        "projects." + config.name
      );
      callback(true);
    } else {
      callback(false);
    }
  }

  public static async openProject(config: ProjectConfig) {
    const data = await client.getData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      "projects." + config.name
    );
    UIManager.showComponent(
      <ProjectEditor
        project={data}
        monaco={{
          mode: "project",
          code: data.code,
        }}
      />
    );
  }

  public static isEmptyResponse(response: any): boolean {
    return (
      response === {} ||
      response === false ||
      response === undefined ||
      response == null ||
      response == "The data was not found." ||
      response.toString().includes("Error 500 Internal Server Error!")
    );
  }
}

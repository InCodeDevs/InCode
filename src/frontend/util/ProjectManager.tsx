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
import * as JSZip from "jszip";
import { Networking } from "./Networking";
import Workspace from "./Workspace";

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
    if (data.type === "code") {
      UIManager.showComponent(
        <ProjectEditor
          project={data}
          monaco={{
            mode: "project",
            code: data.code,
          }}
        />
      );
    } else {
      console.log(data.code);
      UIManager.showComponent(
        <ProjectEditor
          project={data}
          blockly={{
            initialXml: data.code,
          }}
        />
      );
    }
  }

  public static async getProjectList(): Promise<string[]> {
    const data = await client.getData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      "projects"
    );
    if (this.isEmptyResponse(data)) {
      return [];
    }
    return data;
  }

  public static async getProjects(): Promise<ProjectConfig[]> {
    const projects = await this.getProjectList();
    let projectConfigs: ProjectConfig[] = [];
    for (let i = 0; i < projects.length; i++) {
      const project = await client.getData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects." + projects[i]
      );
      projectConfigs.push(project);
    }
    return projectConfigs;
  }

  public static async deleteProject(projectConfig: ProjectConfig) {
    const projects = await this.getProjectList();
    let newProjects: string[] = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i] !== projectConfig.name) {
        newProjects.push(projects[i]);
      }
    }
    await client.storeData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      newProjects,
      "projects"
    );
    await client.deleteData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      "projects." + projectConfig.name
    );
  }

  public static async renameProject(
    projectConfig: ProjectConfig,
    newName: string
  ) {
    const projects = await this.getProjectList();
    const origName = projectConfig.name;
    projectConfig.name = newName;
    let newProjects: string[] = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i] !== origName) {
        newProjects.push(projects[i]);
      }
    }
    newProjects.push(newName);
    await client.storeData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      newProjects,
      "projects"
    );
    await client.storeData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      projectConfig,
      "projects." + newName
    );
    await client.deleteData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      "projects." + origName
    );
  }

  public static async saveProject(projectConfig: ProjectConfig) {
    await client.storeData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      projectConfig,
      "projects." + projectConfig.name
    );
  }

  public static async export(projectConfig: ProjectConfig) {
    const zip = new JSZip();
    // @ts-ignore
    const currentCode = Workspace.getCode();

    const response = (
      await fetch("https://http-compiler-api.incodelang.de/compiled", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          code: currentCode,
        }),
      })
    ).text();
    zip.file(
      "index.html",
      "<!doctype html><html lang='de'><body><script src='code.js' defer async></script></body></html>"
    );
    zip.file("code.js", response);
    zip.file("code.ic", currentCode);
    zip
      .generateAsync({
        type: "base64",
        compressionOptions: {
          level: 6,
        },
      })
      .then((content) => {
        Networking.downloadCustom(
          "data:application/zip; base64," + content,
          projectConfig.name + ".zip"
        );
      });
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

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import PopupManager from "./PopupManager";
import i18n from "./i18n";
import { WebClient } from "@incodelang/accounts-client";
import { ProjectConfig } from "../types/ProjectConfig";
import UserManager from "./UserManager";
import UIManager from "./UIManager";
import ProjectEditor from "../views/Project/ProjectEditor";
import React from "react";
import * as JSZip from "jszip";
import { Networking } from "./Networking";
import Workspace from "./Workspace";
import String from "./String";
import { v4 as uuidv4 } from "uuid";

const client = new WebClient("");

export default class ProjectManager {
  public static checkProjectName(value: string): boolean {
    if (value.length < 4) {
      PopupManager.showPopup(
        "Alert",
        "error",
        i18n.translate("error.project.name.too.short"),
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
    if (config.type === "code") {
      UIManager.showComponent(
        <ProjectEditor
          project={config}
          monaco={{ mode: "project", code: config.code }}
        />
      );
    } else {
      UIManager.showComponent(
        <ProjectEditor project={config} blockly={{ initialXml: config.code }} />
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
      const project = JSON.parse(
        await client.getData_u(
          UserManager.getUsername(),
          UserManager.getToken(),
          "projects." + projects[i]
        )
      );
      if (!project.publicData) {
        console.log(1);
        projectConfigs.push(project);
      } else {
        const data = await client.getData(
          UserManager.getUsername(),
          UserManager.getToken(),
          project.publicData
        );

        console.log(data);
        console.log(typeof data);
        console.log(JSON.parse(data));
        console.log(typeof JSON.parse(data));

        projectConfigs.push(JSON.parse(data));

        console.log(typeof projectConfigs[projectConfigs.length - 1]);
      }
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
    if (projectConfig.publicData) {
      await client.deleteData(
        UserManager.getUsername(),
        UserManager.getToken(),
        projectConfig.publicData
      );
    } else {
      await client.deleteData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects." + projectConfig.name
      );
    }
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
    if (projectConfig.publicData) {
      await client.storeData(
        UserManager.getUsername(),
        UserManager.getToken(),
        projectConfig,
        projectConfig.publicData.split(":")[0] + ":" + newName
      );
      await client.deleteData(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects." + origName
      );
    } else {
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
  }

  public static async saveProject(
    projectConfig: ProjectConfig,
    forceAccount = false
  ) {
    console.log(projectConfig);
    if (forceAccount || !projectConfig.publicData) {
      console.log(1);
      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        JSON.stringify(projectConfig),
        "projects." + projectConfig.name
      );
    } else {
      console.log(2);
      await client.storeData(
        UserManager.getUsername(),
        UserManager.getToken(),
        JSON.stringify(projectConfig),
        projectConfig.publicData
      );
    }
  }

  public static async export(projectConfig: ProjectConfig) {
    const zip = new JSZip();
    // @ts-ignore
    const currentCode = Workspace.getCode(false);
    let blocklyXML = "";

    if (Workspace.isBlockly()) {
      blocklyXML = Workspace.getCode(true);
    }

    const response = (
      await fetch("/api/v1/compiler/compiled", {
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

    if (blocklyXML !== "") {
      zip.file("blockly.xml", blocklyXML);
    }

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

  public static async addToProjectList(projectName: string) {
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

    projects.push(projectName);
    await client.storeData_u(
      UserManager.getUsername(),
      UserManager.getToken(),
      projects,
      "projects"
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

  public static async inviteUser(
    username: string,
    projectConfig: ProjectConfig
  ): Promise<boolean> {
    if (await client.existsPostBox(username, "invites")) {
      await client.addToPostBox(
        UserManager.getUsername(),
        UserManager.getToken(),
        "invites",
        username,
        JSON.stringify({
          from: UserManager.getUsername(),
          project_name: projectConfig.name,
          project_type: projectConfig.type,
          public_data: projectConfig.publicData,
        })
      );
      return true;
    } else {
      return false;
    }
  }

  public static downloadProject(projectConfig: ProjectConfig) {
    const binary = String.toHex(JSON.stringify(projectConfig));
    Networking.download(projectConfig.name + ".icp4", binary, "text/plain");
  }

  public static async createProjectWithBinary(
    binary: string,
    open: boolean = false
  ) {
    const projectConfig = JSON.parse(String.fromHex(binary));

    projectConfig.name = projectConfig.name + "_" + uuidv4().split("-")[0];

    await ProjectManager.saveProject(projectConfig);
    await ProjectManager.addToProjectList(projectConfig.name);

    if (open) {
      ProjectManager.openProject(projectConfig);
    }
  }
}

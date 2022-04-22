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
import { v4, v4 as uuidv4 } from "uuid";
import PopupManagerReloaded from "./PopupManagerReloaded";
import SocketConnection from "./SocketConnection";
import { Registry } from "./Registry";
import ShareProject from "../views/Project/ShareProject/ShareProject";

const client = new WebClient("");

export default class ProjectManager {
  public static checkProjectName(value: string): boolean {
    if (value.length < 4) {
      PopupManagerReloaded.toast("error.project.name.too.short", "error");
    } else if (value.length > 12) {
      PopupManagerReloaded.toast("error.project.name.too.long", "error");
    } else if(value.includes(" ")) {
      PopupManagerReloaded.toast("error.project.name.no.spaces", "error");
    }
    return value.length >= 4 && value.length <= 12 && !value.includes(" ");
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
    Registry.putRegister(0x052, config);
    Registry.putRegister(0x053, config.type);
    if (config.publicData) {
      SocketConnection.openProject(config.publicData);
    }
    if (config.type === "code") {
      UIManager.showComponent(
        <ProjectEditor
          project={config}
          monaco={{
            mode: "project",
            code: config.code,
            public: config.publicData,
          }}
        />
      );
    } else {
      UIManager.showComponent(
        <ProjectEditor project={config} blockly={{ initialXml: config.code }} />
      );
    }
  }

  public static async getProjectList(): Promise<string[]> {
    try {
      const data = await client.getData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects"
      );
      if (this.isEmptyResponse(data)) {
        return [];
      }
      return data;
    } catch {
      return [];
    }
  }

  public static async getProjects(): Promise<ProjectConfig[]> {
    const projects = await this.getProjectList();
    let projectConfigs: ProjectConfig[] = [];
    try {
      for (let i = 0; i < projects.length; i++) {
        let project = await client.getData_u(
          UserManager.getUsername(),
          UserManager.getToken(),
          "projects." + projects[i]
        );

        if (!project.name) {
          project = JSON.parse(project);
        }
        if (!project.publicData) {
          projectConfigs.push(project);
        } else {
          let data = await client.getData(
            UserManager.getUsername(),
            UserManager.getToken(),
            project.publicData
          );

          if (data) {
            if (!data.name) {
              data = JSON.parse(data);
            }
            projectConfigs.push(data);
          }
        }
      }
      return projectConfigs;
    } catch (e) {
      if (localStorage.getItem("offline.projects")) {
        const projects = JSON.parse(
          localStorage.getItem("offline.projects") as string
        );
        projects.forEach((project: ProjectConfig) => {
          projectConfigs.push(project);
        });
        return projectConfigs;
      }
      return [];
    }
  }

  public static async getProject(name: string): Promise<ProjectConfig | null> {
    if ((await this.getProjectList()).includes(name)) {
      const userData = await client.getData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects." + name
      );

      if (userData.publicData) {
        const data = await client.getData(
          UserManager.getUsername(),
          UserManager.getToken(),
          userData.publicData
        );
        if (data) {
          return data;
        }
      }
      return userData;
    } else {
      return null;
    }
  }

  public static async deleteProject(projectConfig: ProjectConfig) {
    const projects = await ProjectManager.getProjectList();
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
    if (!projectConfig.publicData) {
      await client.deleteData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        "projects." + projectConfig.name
      );
    } else {
      console.log(projectConfig);
      new WebClient("").addToPostBox(
        UserManager.getUsername(),
        UserManager.getToken(),
        "project.feed",
        projectConfig.publicData.split(":")[0],
        JSON.stringify({
          protocol_action: 0x03,
          project_name: projectConfig.name,
          public_data: projectConfig.publicData,
        })
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

    projectConfig.updatedAt = new Date();

    if (forceAccount || !projectConfig.publicData) {
      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        JSON.stringify(projectConfig),
        "projects." + projectConfig.name
      );
    } else {
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

    if (!projects.includes(projectName)) {
      projects.push(projectName);
      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        projects,
        "projects"
      );
    }
  }

  public static async removeFromProjectList(projectName: string) {
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
    }

    if (projects.includes(projectName)) {
      projects = projects.filter((project) => project !== projectName);

      await client.storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        projects,
        "projects"
      );
    }
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
    if (await client.existsPostBox(username, "project.feed")) {
      await client.addToPostBox(
        UserManager.getUsername(),
        UserManager.getToken(),
        "project.feed",
        username,
        JSON.stringify({
          from: UserManager.getUsername(),
          project_name: projectConfig.name,
          project_type: projectConfig.type,
          public_data: projectConfig.publicData,
          protocol_action: 0x00,
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
      PopupManagerReloaded.alert({
        title: i18n.translate("menu.main.import.project.success"),
        description: i18n.translate(
          "menu.main.import.project.success.description"
        ),
      });
    }
  }

  public static async shareProject(pConfig: ProjectConfig): Promise<string> {
    pConfig.publicData =
      UserManager.getUsername() + ":" + pConfig.name + "_" + v4();

    const client = new WebClient("");
    await client.storeData(
      UserManager.getUsername(),
      UserManager.getToken(),
      JSON.stringify(pConfig),
      pConfig.publicData
    );
    await ProjectManager.saveProject(pConfig, true);
    return pConfig.publicData;
  }
}

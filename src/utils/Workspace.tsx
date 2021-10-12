/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import { BlocklyCompiler } from "../blockly/BlocklyCompiler";
import { WebCompiler } from "@incodelang/language/dist/incode";
import { Options } from "./Options";
import { Networking } from "./Networking";
import { Registry } from "./Registry";
import { ProjectManager } from "./ProjectManager";
import { UIManager } from "./UIManager";
import * as Blockly from "blockly/blockly";
import * as JSZip from "jszip";
import { MainMenu } from "../components/MainMenu";
import * as React from "react";
import { ProjectTypeSelector } from "../components/selector/ProjectTypeSelector";
import { UserUtil } from "./UserUtil";
import { SelectLoginOption } from "../components/login/SelectLoginOption";
import { Language } from "./international/Language";
import { WebClient } from "@incodelang/accounts-client";

const User: WebClient = new WebClient("");

export class Workspace {
  /**
   * Compiles the current Workspace
   * @param dl If this is true the output will be downloaded as "Programm.js"
   */
  public static compile(dl = true) {
    let code = "";

    const errors: string[] = [];

    if (Options.currentEditor != "") {
      if (Options.currentEditor === "vscode") {
        // @ts-ignore
        code = window.editor.getValue();
      } else {
        code = new BlocklyCompiler().compile();
      }

      const oldLog = console.log;

      console.log = function (message: string) {
        if (message.startsWith("Error in statement:")) {
          errors.push(message.split("Error in statement: ")[1]);
        }
        oldLog(message);
      };

      code = WebCompiler.compile(code);

      Options.currentLiveJS = btoa(code);

      console.log = oldLog;

      if (errors.length !== 0 && !dl) {
        let jsCode =
          "document.body.style.backgroundColor = '#fff';" +
          "let list = document.createElement('ol'); let l = null;";
        errors.forEach((error) => {
          while (
            error.includes("\r") ||
            error.includes("\t") ||
            error.includes("\n")
          ) {
            error = error.replace(/\r/g, "");
            error = error.replace(/\t/g, "");
            error = error.replace(/\n/g, "");
          }
          jsCode +=
            "l = document.createElement('li');" +
            "l.innerText = '" +
            JSON.stringify(error) +
            "';" +
            "list.appendChild(l);";
        });

        jsCode += "document.body.appendChild(list);";

        while (
          jsCode.includes("\r") ||
          jsCode.includes("\t") ||
          jsCode.includes("\n")
        ) {
          jsCode = jsCode.replace(/\r/g, "");
          jsCode = jsCode.replace(/\t/g, "");
          jsCode = jsCode.replace(/\n/g, "");
        }

        UIManager.alert(
          "<h1 style='text-align: center;'>" +
            Language.a("menu.failed") +
            "</h1>" +
            "<iframe src='preview.html?code=" +
            btoa(jsCode) +
            "' width='100%' height='100%'></iframe>"
        );
      }

      if (dl) {
        Networking.download("Programm.js", code);
      }
    }
  }

  /**
   * Compiles the code and opens it in the preview window
   */
  public static preview = (withFrame = true) => {
    if (Options.currentEditor != "") {
      Workspace.compile(false);
      if (document.getElementById("livePreviewFrame") != undefined) {
        (document.getElementById("livePreview") as HTMLDivElement).removeChild(
          document.getElementById("livePreviewFrame") as HTMLIFrameElement
        );
      }
      if (
        ProjectManager.getProjectEnv(Registry.getRegister(0x10ad)).includes(
          "styled"
        )
      ) {
        Options.currentLiveJS = btoa(
          "let incode_style_tag = document.createElement('link'); incode_style_tag.type = 'text/css'; incode_style_tag.rel = 'stylesheet'; incode_style_tag.href = \"https://incode-cdn.craftions.net/export/incode.css\"; document.head.appendChild(incode_style_tag);" +
            atob(Options.currentLiveJS)
        );
      }

      if (withFrame) {
        const previewFrame = document.createElement("iframe");
        previewFrame.src =
          "preview.html?code=" + Workspace.toBinary(Options.currentLiveJS);
        previewFrame.id = "livePreviewFrame";
        (document.getElementById("livePreview") as HTMLDivElement).appendChild(
          previewFrame
        );
      }
    }
  };

  public static toBinary(s: string) {
    const codeUnits = new Uint16Array(s.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = s.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
  }

  /**
   * Saves the current Workspace
   */
  public static save(showSucceedMessage = true) {
    ProjectManager.saveProject(
      Registry.getRegister(0x10ad),
      Workspace.getWorkspaceCode()
    ); // 0x10AD => magic value
    if (showSucceedMessage)
      UIManager.alert(
        "<h1 style='text-align: center;'>" +
          Language.a("menu.success") +
          "</h1><h4 style='text-align: center; color: limegreen'>" +
          Language.a("project.save") +
          "</h4>"
      );
  }

  /**
   * Deletes the Project associated to the current Workspace
   */
  public static delete() {
    UIManager.ask(
      "<h1 style='text-align: center'>" +
        Language.a("menu.confirm") +
        "</h1>" +
        "<h4>" +
        Language.a("project.delete") +
        "</h4>",
      () => {
        if (document.getElementById("livePreviewFrame") != undefined) {
          (
            document.getElementById("livePreview") as HTMLDivElement
          ).removeChild(
            document.getElementById("livePreviewFrame") as HTMLIFrameElement
          );
        }
        UIManager.deleteBlockly();
        UIManager.deleteMonaco();
        UIManager.hideMenuBar();
        UIManager.showComponent(<MainMenu />);
        ProjectManager.deleteProject(Registry.getRegister(0x10ad));
      }
    );
  }

  /**
   * Changes the name of the Projects associated to the current Workspace
   */
  public static rename() {
    Workspace.save(false);
    UIManager.prompt(
      "<h1 style='text-align: center;'>" +
        Language.a("project.rename") +
        "</h1>" +
        "<h4 style='text-align: center'>" +
        Language.a("project.rename.new.name") +
        "</h4>",
      (value: string) => {
        ProjectManager.renameProject(
          Registry.getRegister(0x10ad),
          value,
          Workspace.getWorkspaceCode()
        );
        Registry.putRegister(0x10ad, value);
      }
    );
  }

  /**
   * Returns the Code of the current Workspace
   * @return The code
   */
  public static getWorkspaceCode(): string {
    let code = "";
    if (
      (document.getElementById("monaco") as HTMLDivElement).style.display !=
      "none"
    ) {
      // @ts-ignore
      code = window.editor.getValue();
    } else {
      code = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()).outerHTML;
    }
    return code;
  }

  /**
   * Deploys the current Workspace to the template registry
   */
  public static deployTemplate() {
    UIManager.ask(
      "<h1 style='text-align: center'>" +
        Language.a("deploy") +
        "</h1>" +
        "<h4 style='text-align: center;'>" +
        Language.a("deploy.warning") +
        "</h4>",
      () => {
        const x: XMLHttpRequest = new XMLHttpRequest();
        const c = Workspace.getWorkspaceCode();
        x.open(
          "GET",
          "/api/v1/template/upload?name=" +
            Registry.getRegister(0x10ad) +
            "&type=" +
            ProjectManager.getProjectType(Registry.getRegister(0x10ad)) +
            "&code=" +
            btoa(c),
          false
        );
        x.send(null);
        if (x.responseText === "Successful") {
          UIManager.alert(
            "<h1 style='text-align: center'>" +
              Language.a("menu.success") +
              "</h1>" +
              "<h4 style='text-align: center;'>" +
              Language.a("deploy.success") +
              "</h4>"
          );
        } else {
          UIManager.alert(
            "<h1 style='text-align: center; color: red'>" +
              Language.a("menu.failed") +
              "</h1>" +
              "<h4 style='text-align: center;'>" +
              Language.a("project.create.name.failed.exists") +
              "</h4>"
          );
        }
      }
    );
  }

  public static deployProject() {
    Workspace.compile(false);

    const x: XMLHttpRequest = new XMLHttpRequest();
    x.open("POST", location.href + "api/v1/url/create", false);
    x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    x.send(
      '{"target": "' +
        location.href +
        "preview.html?code=" +
        Workspace.toBinary(Options.currentLiveJS) +
        '"}'
    );

    UIManager.alert(
      "<h1>" +
        Language.a("deploy.project") +
        "</h1><h4><pre><code><a target='_blank' href='" +
        JSON.parse(x.responseText).url +
        "'>" +
        Language.a("menu.open") +
        "</a></code></pre></h4>"
    );
  }

  public static deployAccount() {
    // @ts-ignore
    if (UserUtil.getSavedUser().username && UserUtil.getSavedUser().password) {
      const currentUser = UserUtil.getSavedUser();

      console.log(
        localStorage.getItem(
          "incode-editor.projects." + Registry.getRegister(0x10ad)
        ) as string
      );

      const config = JSON.parse(
        localStorage.getItem(
          "incode-editor.projects." + Registry.getRegister(0x10ad)
        ) as string
      );
      config.save = "cloud";

      localStorage.setItem(
        "incode-editor.projects." + Registry.getRegister(0x10ad),
        JSON.stringify(config)
      );
      User.storeData_u(
        // @ts-ignore
        currentUser.username,
        // @ts-ignore
        currentUser.password,
        JSON.parse(
          localStorage.getItem(
            "incode-editor.projects." + Registry.getRegister(0x10ad)
          ) as string
        ),
        "project-" + Registry.getRegister(0x10ad)
      ).then((r) => {
        if (r) {
          UIManager.alert(
            "<h1>" +
              Language.a("menu.success") +
              "</h1><h4>" +
              Language.a("deploy.account.success") +
              "</h4>"
          );
        }
      });
    } else {
      UIManager.ask(
        "<h1>" +
          Language.a("menu.attention") +
          "</h1><h4>" +
          Language.a("deploy.account.failed") +
          "</h4>",
        () => {
          Workspace.save(false);
          Registry.putRegister(0x10af, () => {
            Workspace.deployAccount();
          });
          UIManager.showComponent(<SelectLoginOption />);
        }
      );
    }
  }

  /**
   * Exports the current workspace
   */
  public static export() {
    Workspace.compile(false);
    const code = atob(Options.currentLiveJS);

    let incode = "";
    if (Options.currentEditor === "vscode") {
      // @ts-ignore
      incode = window.editor.getValue();
    } else {
      incode = new BlocklyCompiler().compile();
    }

    switch (ProjectManager.getProjectEnv(Registry.getRegister(0x10ad))) {
      case "website":
        Workspace.exportFinal(code, incode);
        break;
      case "styled-website":
        Workspace.exportFinal(code, incode, true);
        break;
      case "desktop":
        Workspace.exportFinalDesktop(code);
        break;
      case "styled-desktop":
        Workspace.exportFinalDesktop(code, true);
        break;
      case "game":
        Workspace.exportFinal(code, incode, false, true);
        break;
      default:
        Workspace.exportFinal(code, incode);
        break;
    }
  }

  public static exportFinalDesktop(code: string, styled = false) {
    const zipFile = new JSZip();

    zipFile.folder("scripts");
    zipFile.folder("resources");

    zipFile.file(
      "exporter.bat",
      Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/exporter/exporter.bat"
      ).replace(
        "PROJECT_NAME=Pupsi",
        "PROJECT_NAME=" + Registry.getRegister(0x10ad)
      )
    );
    zipFile.file(
      "scripts/updateApp.js",
      Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/exporter/scripts/updateApp.js"
      )
    );

    let inCodeCSS = "";

    if (styled) {
      const inCodeStyleSheet = Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/incode.css"
      );

      zipFile.file("resources/incode.css", inCodeStyleSheet + "\n");
      inCodeCSS =
        "\n<link rel='stylesheet' type='text/css' href='incode.css'>\n";
    }

    zipFile.file(
      "resources/index.js",
      Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/exporter/default/index.js"
      )
    );

    zipFile.file(
      "resources/index.html",
      `
            <!DOCTYPE html>
            <html lang="de">
                <head>
                    <title>${Registry.getRegister(0x10ad)}</title>
                    <script defer src="${Registry.getRegister(
                      0x10ad
                    )}.js"></script>${inCodeCSS}
                </head>
                <body></body>
            </html>
        ` + "\n"
    );

    zipFile.file("resources/" + Registry.getRegister(0x10ad) + ".js", code);

    zipFile
      .generateAsync({
        type: "base64",
        compressionOptions: {
          level: 6,
        },
      })
      .then((content) => {
        Networking.downloadCustom(
          "data:application/zip; base64," + content,
          Registry.getRegister(0x10ad) + ".zip"
        );
      });
  }

  public static exportFinal(
    code: string,
    inCode: string,
    styled = false,
    game = false
  ) {
    const zipFile = new JSZip();
    zipFile.file(Registry.getRegister(0x10ad) + ".js", code + "\n");
    zipFile.file(Registry.getRegister(0x10ad) + ".ic", inCode + "\n");

    let inCodeCSS = "";
    let inCodeJS = "";

    if (styled) {
      const inCodeStyleSheet = Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/incode.css"
      );

      zipFile.file("incode.css", inCodeStyleSheet + "\n");
      inCodeCSS =
        "\n<link rel='stylesheet' type='text/css' href='incode.css'>\n";
    }

    if (game) {
      const inCodeScript = Networking.getURLContent(
        "https://incode-cdn.craftions.net/export/incode.js"
      );

      zipFile.file("incode.js", inCodeScript + "\n");
      inCodeJS = "\n<script defer src='incode.js'></script>\n";
    }

    zipFile.file(
      "index.html",
      `
            <!DOCTYPE html>
            <html lang="de">
                <head>
                    <title>${Registry.getRegister(0x10ad)}</title>
                    <script defer src="${Registry.getRegister(
                      0x10ad
                    )}.js"></script>${inCodeCSS}${inCodeJS}
                </head>
                <body></body>
            </html>
        ` + "\n"
    );
    zipFile.file(
      "Ließ mich.txt",
      "Vielen Dank, dass du den offiziellen InCode Editor benutzt!\n" +
        "\n" +
        'Dein exportiertes Programm findest du in der Datei "index.html".\n' +
        "Außerdem findest du in der .ic Datei deinen geschriebenen InCode und in der .js\n" +
        "Datei den dazu gehörigen JavaScript Code!\n" +
        "\n" +
        "Wir wünschen dir weiterhin noch viel Spaß mit InCode.\n" +
        "\n" +
        "Das InCode Team"
    );
    zipFile.file(
      Registry.getRegister(0x10ad) + ".json",
      localStorage.getItem(
        "incode-editor.projects." + Registry.getRegister(0x10ad)
      ) as string
    );

    zipFile
      .generateAsync({
        type: "base64",
        compressionOptions: {
          level: 6,
        },
      })
      .then((content) => {
        Networking.downloadCustom(
          "data:application/zip; base64," + content,
          Registry.getRegister(0x10ad) + ".zip"
        );
      });
  }

  public static saveProjectFile() {
    Workspace.save(false);
    Networking.download(
      Registry.getRegister(0x10ad) + ".json",
      localStorage.getItem(
        "incode-editor.projects." + Registry.getRegister(0x10ad)
      ) as string,
      "application/json"
    );
  }

  public static changeEnvType() {
    Workspace.save(false);
    if (document.getElementById("livePreviewFrame") != undefined) {
      (document.getElementById("livePreview") as HTMLDivElement).removeChild(
        document.getElementById("livePreviewFrame") as HTMLIFrameElement
      );
    }
    UIManager.hideMenuBar();
    UIManager.deleteMonaco();
    UIManager.deleteBlockly();
    Registry.putRegister(0x10af, (env: string) => {
      ProjectManager.setProjectEnv(Registry.getRegister(0x10ad), env);
      ProjectManager.openProject(
        Registry.getRegister(0x10ad),
        ProjectManager.getProjectType(Registry.getRegister(0x10ad))
      );
    });
    UIManager.showComponent(<ProjectTypeSelector />);
  }
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ProjectConfig } from "../../types/ProjectConfig";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faBackward,
  faCode,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import Container from "../../components/Container";
import ProjectManager from "../../util/ProjectManager";
import UserManager from "../../util/UserManager";
import FakeLoader from "../../util/FakeLoader";
import UIManager from "../../util/UIManager";
import Text from "../../components/Text";
import i18n from "../../util/i18n";
import String from "../../util/String";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import { Compiler } from "../../../../compiler/src";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ExportProject(props: Props) {
  let jobId = "";
  let jobStatus = {};

  return (
    <>
      <Container centered>
        <Title title={"menu.project.export.title"} size={1} centered />
        <MenuItemList>
          <MenuItem
            icon={faCode}
            onclick={() => {
              ProjectManager.openProject(props.projectConfig).then(() => {
                setTimeout(() => {
                  ProjectManager.export(props.projectConfig);
                }, 2000);
              });
            }}
            title={"menu.project.export.code"}
          />
          <MenuItem
            icon={faDesktop}
            onclick={() => {
              FakeLoader.show();
              UIManager.showComponent(
                <>
                  <Title
                    title={"menu.project.export.progress.title"}
                    size={1}
                    centered
                  />
                  <div style={{ textAlign: "center" }}>
                    <Text nol18n>
                      {i18n.translate("menu.project.export.progress.text")}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <details>
                      <summary
                        style={{
                          color: "white",
                          padding: "1.2rem",
                          fontSize: "1.25rem",
                        }}
                      >
                        Details
                      </summary>
                      <pre
                        style={{
                          padding: "16px",
                          width: "100%",
                          overflow: "auto",
                          lineHeight: 1.45,
                          background: "rgb(22, 27, 34)",
                          borderRadius: "6px",
                          color: "white",
                          flex: "100%",
                          fontFamily:
                            "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace",
                          textAlign: "left",
                        }}
                      >
                        <code>
                          Job-ID: <span id={"p_export-jid"}>{jobId}</span>
                          {"\n\n"}
                          Current-Status:
                          {"\n"}
                          <span id={"p_export-cs"}>
                            {JSON.stringify(jobStatus, null, 2)}
                          </span>
                        </code>
                      </pre>
                    </details>
                  </div>
                </>,
                "fake_loader_content"
              );
              fetch("/api/v1/generator/desktop", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: UserManager.getUsername(),
                  password: UserManager.getToken(),
                  projectName: props.projectConfig.name,
                  code:
                    "<script>" +
                    Compiler.compile(props.projectConfig.code) +
                    "</script>",
                }),
              }).then((response) => {
                if (response.status === 429) {
                  UIManager.unmountAt("fake_loader_content");
                  FakeLoader.hide();
                  PopupManagerReloaded.alert({
                    title: i18n.translate("error"),
                    description: i18n.translate(
                      "menu.project.export.limit-reached"
                    ),
                  });
                } else {
                  response.json().then(async (data0) => {
                    (
                      document.getElementById("p_export-jid") as HTMLSpanElement
                    ).innerText = data0.jobId;
                    let f = false;
                    let url = "";
                    const interval = setInterval(() => {
                      fetch("/api/v1/job/" + data0.jobId).then((response) => {
                        response.json().then((d) => {
                          d.__random = String.random(8);
                          (
                            document.getElementById(
                              "p_export-cs"
                            ) as HTMLSpanElement
                          ).innerText = JSON.stringify(d, null, 2);
                          if (d.status.toLowerCase() === "finished") {
                            if (!f) {
                              f = true;
                              url = "http://" + location.host + d.message;
                              window.open(url, "_blank");
                              clearInterval(interval);
                              FakeLoader.hide();
                              UIManager.unmountAt("fake_loader_content");
                              ProjectManager.openProject(props.projectConfig);
                            }
                          }
                        });
                      });
                    }, 3000);
                  });
                }
              });
            }}
            title={"menu.project.export.desktop"}
          />
          <MenuItem
            icon={faBackward}
            onclick={() => {
              ProjectManager.openProject(props.projectConfig);
            }}
            title={"menu.share-project.back"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}

ExportProject.displayName = "ExportProject";

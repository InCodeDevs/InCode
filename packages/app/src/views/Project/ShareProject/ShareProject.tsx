/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../../components/Container";
import Title from "../../../components/Title";
import { ProjectConfig } from "../../../types/ProjectConfig";
import MenuItemList from "../../../components/Menu/MenuItemList";
import MenuItem from "../../../components/Menu/MenuItem";
import {
  faBackward,
  faPuzzlePiece,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../../util/UIManager";
import OpenProject from "../OpenProject";
import TemplateManager from "../../../util/TemplateManager";
import i18n from "../../../util/i18n";
import PopupManagerReloaded from "../../../util/PopupManagerReloaded";
import { Compiler } from "@incodelang/compiler";
import ManageShare from "./ManageShare";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ShareProject(props: Props) {
  return (
    <Container centered>
      <Title title={"menu.share-project.title"} size={1} centered />
      <MenuItemList>
        <MenuItem
          // @ts-ignore
          icon={faUser}
          onclick={() => {
            UIManager.showComponent(
              <ManageShare projectConfig={props.projectConfig} />
            );
          }}
          title={"menu.share-project.manage"}
        />
        <MenuItem
          // @ts-ignore
          icon={faScroll}
          onclick={() => {
            TemplateManager.shareTemplate(props.projectConfig).then((obj) => {
              if (obj.error) {
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.failed.template.title"
                  ),
                  description: i18n.translate(
                    "menu.share-project.failed.template.description"
                  ),
                });
              } else {
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.success.template.title"
                  ),
                  description: i18n.translate(
                    "menu.share-project.success.template.description"
                  ),
                });
              }
            });
          }}
          title={"menu.share-project.share-template"}
        />
        <MenuItem
          // @ts-ignore
          icon={faPuzzlePiece}
          onclick={() => {
            if (props.projectConfig.type === "blockly") {
              PopupManagerReloaded.alert({
                title: i18n.translate("error"),
                description: i18n.translate(
                  "menu.share-project.failed.project.blockly.description"
                ),
              });
              return;
            }
            const code = Compiler.compile(props.projectConfig.code);
            fetch("/api/v1/publish/project", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code: "<script>" + code + "</script>" }),
            })
              .then((r) => r.json())
              .then((t) => {
                const url = t.url;
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.success.project.title"
                  ),
                  description: (
                    <>
                      <h3 style={{ textAlign: "center" }}>
                        {i18n.translate(
                          "menu.share-project.success.project.description"
                        )}
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {location.protocol + "//" + location.host + url}
                        </a>
                      </h3>
                    </>
                  ),
                });
              });
          }}
          title={"menu.share-project.share-project"}
        />
        <MenuItem
          // @ts-ignore
          icon={faBackward}
          onclick={() => {
            UIManager.showComponent(<OpenProject />);
          }}
          title={"menu.share-project.back"}
        />
      </MenuItemList>
    </Container>
  );
}

ShareProject.displayName = "ShareProject";

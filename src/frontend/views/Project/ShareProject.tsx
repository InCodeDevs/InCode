/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { ProjectConfig } from "../../types/ProjectConfig";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faPuzzlePiece,
  faScroll,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import UIManager from "../../util/UIManager";
import OpenProject from "./OpenProject";
import TemplateManager from "../../util/TemplateManager";
import PopupManager from "../../util/PopupManager";
import i18n from "../../util/i18n";
import ProjectInviteManager from "./ProjectInviteManager";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ShareProject(props: Props) {
  return (
    <Container centered>
      <Title title={"menu.share-project.title"} size={1} centered />
      <MenuItemList>
        <MenuItem
          icon={faUser}
          onclick={() => {
            UIManager.showComponent(
              <ProjectInviteManager projectConfig={props.projectConfig} />
            );
          }}
          title={"menu.share-project.share-with-others"}
        />
        <MenuItem
          icon={faScroll}
          onclick={() => {
            TemplateManager.shareTemplate(props.projectConfig).then((obj) => {
              if (obj.error) {
                PopupManager.showPopup(
                  "Alert",
                  "menu.share-project.failed.template.title",
                  i18n.translate(
                    "menu.share-project.failed.template.description"
                  ),
                  () => {},
                  true
                );
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "menu.share-project.success.template.title",
                  i18n.translate(
                    "menu.share-project.success.template.description"
                  ),
                  () => {},
                  true
                );
              }
            });
          }}
          title={"menu.share-project.share-template"}
        />
        <MenuItem
          icon={faPuzzlePiece}
          onclick={() => {
            const code = props.projectConfig.code;
            fetch("/api/v1/url/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                target:
                  "https://http-compiler-api.incodelang.de/view?code=" + code,
              }),
            })
              .then((r) => r.json())
              .then((t) => {
                const url = t.url;
                PopupManager.showPopup(
                  "Alert",
                  "menu.share-project.success.project.title",
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
                );
              });
          }}
          title={"menu.share-project.share-project"}
        />
        <MenuItem
          icon={faTimesCircle}
          onclick={() => {
            UIManager.showComponent(<OpenProject />);
          }}
          title={"menu.share-project.back"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}

ShareProject.displayName = "ShareProject";

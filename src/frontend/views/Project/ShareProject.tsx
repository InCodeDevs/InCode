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
} from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import UIManager from "../../util/UIManager";
import OpenProject from "./OpenProject";
import TemplateManager from "../../util/TemplateManager";
import PopupManager from "../../util/PopupManager";
import l18n from "../../util/l18n";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ShareProject(props: Props) {
  return (
    <Container centered>
      <Title title={"menu.share-project.title"} size={1} centered />
      <MenuItemList>
        <MenuItem
          icon={faScroll}
          onclick={() => {
            TemplateManager.shareTemplate(props.projectConfig).then((obj) => {
              if (obj.error) {
                PopupManager.showPopup(
                  "Alert",
                  "menu.share-project.failed.template.title",
                  l18n.translate(
                    "menu.share-project.failed.template.description"
                  ),
                  () => {},
                  true
                );
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "menu.share-project.success.template.title",
                  l18n.translate(
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
          onclick={() => {}}
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

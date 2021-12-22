/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ProjectConfig } from "../../types/ProjectConfig";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemInput from "../../components/Menu/MenuItemInput";
import { faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import MenuItemList from "../../components/Menu/MenuItemList";
import i18n from "../../util/i18n";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ProjectInviteManager(props: Props) {
  return (
    <>
      <Container centered>
        <Title
          size={1}
          title={"menu.share-project.share-with-others"}
          centered
        />
        <MenuItemList>
          <MenuItemInput
            icon={faUser}
            input={{
              type: "text",
              id: "share-with-others-name",
              placeholder: i18n.translate(
                "menu.share-project.share-with-others.input-name"
              ),
            }}
          />
          <MenuItem
            icon={faShare}
            onclick={() => {}}
            title={"menu.share-project.share-with-others.invite"}
          />
          <MainMenuItem />
        </MenuItemList>
      </Container>
    </>
  );
}

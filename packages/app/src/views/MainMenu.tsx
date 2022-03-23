/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import MenuItem from "../components/Menu/MenuItem";
import {
  faBook,
  faCogs,
  faFolderOpen,
  faPlay,
  faPlus,
  faScrewdriverWrench,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import MenuItemList from "../components/Menu/MenuItemList";
import UserIndicator from "../components/UserIndicator";
import UserManager from "../util/UserManager";
import UIManager from "../util/UIManager";
import CreateProject from "./Project/CreateProject";
import OpenProject from "./Project/OpenProject";
import Settings from "./Settings/Settings";
import SelectAppMenuItem from "../components/Menu/SelectAppMenuItem";
import ProjectManager from "../util/ProjectManager";
import PopupManagerReloaded from "../util/PopupManagerReloaded";
import DefaultPopup from "../util/popups/DefaultPopup";

export default function MainMenu() {
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered title={"name"} />
        <MenuItemList>
          <MenuItem
            icon={faPlus}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                UIManager.showComponent(<CreateProject />);
              } else {
                PopupManagerReloaded.alert(DefaultPopup.PLEASE_LOG_IN);
              }
            }}
            title={"menu.main.create.project"}
          />
          <MenuItem
            icon={faFolderOpen}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                UIManager.showComponent(<OpenProject />);
              } else {
                PopupManagerReloaded.alert(DefaultPopup.PLEASE_LOG_IN);
              }
            }}
            title={"menu.main.open.project"}
          />
          <MenuItem
            icon={faUpload}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                const input = document.createElement("input");
                input.type = "file";
                input.style.visibility = "hidden";
                input.accept = ".icp4";

                document.body.appendChild(input);
                input.click();

                input.onchange = () => {
                  if ((input.files as FileList).length > 0) {
                    console.log("Test");
                    const file = (input.files as FileList)[0];
                    file.text().then((text) => {
                      ProjectManager.createProjectWithBinary(text, true);
                    });
                  }
                  document.body.removeChild(input);
                };
              } else {
                PopupManagerReloaded.alert(DefaultPopup.PLEASE_LOG_IN);
              }
            }}
            title={"menu.main.import.project"}
          />
          <MenuItem
            icon={faCogs}
            onclick={() => {
              UIManager.showComponent(<Settings />, "root");
            }}
            title={"menu.main.open.settings"}
          />
          <SelectAppMenuItem />
          {UserManager.isLoggedIn() &&
          UserManager.getUsername() === "admin" &&
          new URLSearchParams(window.location.search).get("electron") ===
            null ? (
            <MenuItem
              icon={faScrewdriverWrench}
              title={"menu.admin"}
              onclick={() => {
                UIManager.silentRedirect("/admin");
              }}
            />
          ) : (
            <></>
          )}
        </MenuItemList>
      </Container>
      <UserIndicator />
    </>
  );
}

MainMenu.displayName = "MainMenu";
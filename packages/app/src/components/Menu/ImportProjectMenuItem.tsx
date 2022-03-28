/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";
import String from "../../util/String";
import ProjectManager from "../../util/ProjectManager";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import i18n from "../../util/i18n";
import DefaultPopup from "../../util/popups/DefaultPopup";
import MenuItem from "./MenuItem";
import * as React from "react";

export default function ImportProjectMenuItem() {
  return (
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
              const file = (input.files as FileList)[0];
              file.text().then((text) => {
                try {
                  JSON.parse(String.fromHex(text));
                  ProjectManager.createProjectWithBinary(text, true);
                } catch {
                  PopupManagerReloaded.alert({
                    title: i18n.translate("error"),
                    description: i18n.translate(
                      "menu.main.import.project.error.description"
                    ),
                  });
                }
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
  );
}

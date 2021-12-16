/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import NavigationBar from "../../components/NavigationBar";
import { faCode, faHome } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  return (
    <>
      <NavigationBar
        title={"menu.settings.menu.title"}
        items={[
          {
            title: "menu.settings.menu.item.general",
            onclick: () => {},
            icon: faHome,
          },
          {
            title: "menu.settings.menu.item.code-editor",
            onclick: () => {},
            icon: faCode,
          },
        ]}
      />
    </>
  );
}

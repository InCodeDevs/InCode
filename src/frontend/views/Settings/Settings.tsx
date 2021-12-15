/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import NavigationBar from "../../components/NavigationBar";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  return (
    <>
      <NavigationBar
        title={"name"}
        items={[
          {
            title: "name",
            onclick: () => {},
            icon: faCode,
          },
        ]}
      />
    </>
  );
}

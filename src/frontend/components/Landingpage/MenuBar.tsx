/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "../../util/UIManager";

export default function MenuBar() {
  return (
    <div className={"lp-menubar"}>
      <div
        className={"lp-menubar-title"}
        onClick={() => UIManager.silentRedirect("/")}
      >
        <span>In</span>
        <span>Code</span>
      </div>
    </div>
  );
}

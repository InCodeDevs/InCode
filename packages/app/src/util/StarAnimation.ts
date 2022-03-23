/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
export default class StarAnimation {
  public static readonly enabled = [
    "MainMenu",
    "Login",
    "CreateProject",
    "OpenProject",
    "ShareProject",
    "AccountLogin",
    "AccountManage",
    "AccountRegister",
    "CreateProjectTemplate",
    "InviteManager",
    "SelectApp",
    "ProjectInviteManager",
    "ExportProject",
    "Admin",
  ];

  public static update(element: React.ReactElement) {
    // @ts-ignore
    if (StarAnimation.enabled.includes(element.type.displayName)) {
      (document.getElementById("stars") as HTMLDivElement).style.display =
        "block";
      (document.getElementById("stars2") as HTMLDivElement).style.display =
        "block";
      (document.getElementById("stars3") as HTMLDivElement).style.display =
        "block";
    } else {
      (document.getElementById("stars") as HTMLDivElement).style.display =
        "none";
      (document.getElementById("stars2") as HTMLDivElement).style.display =
        "none";
      (document.getElementById("stars3") as HTMLDivElement).style.display =
        "none";
    }
  }
}

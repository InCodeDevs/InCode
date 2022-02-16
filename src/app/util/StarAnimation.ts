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
  ];

  public static update(element: React.ReactElement) {
    // @ts-ignore
    console.log(element.type);
    // @ts-ignore
    if (StarAnimation.enabled.includes(element.type.displayName)) {
      (document.getElementById("stars") as HTMLDivElement).style.visibility =
        "visible";
      (document.getElementById("stars2") as HTMLDivElement).style.visibility =
        "visible";
      (document.getElementById("stars3") as HTMLDivElement).style.visibility =
        "visible";
    } else {
      (document.getElementById("stars") as HTMLDivElement).style.visibility =
        "hidden";
      (document.getElementById("stars2") as HTMLDivElement).style.visibility =
        "hidden";
      (document.getElementById("stars3") as HTMLDivElement).style.visibility =
        "hidden";
    }
  }
}

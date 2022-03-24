/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faUserTimes, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import UserManager from "../util/UserManager";
import UIManager from "../util/UIManager";
import Login from "../views/Login";
import AccountManage from "../views/Account/AccountManage";

export default function UserIndicator() {
  return (
    <div
      className={"userindicator"}
      onClick={() => {
        if (UserManager.isLoggedIn()) {
          UIManager.showComponent(<AccountManage />, "root");
        } else {
          UIManager.showComponent(<Login />, "root");
        }
      }}
    >
      <FontAwesomeIcon
        // @ts-ignore
        icon={UserManager.isLoggedIn() ? faUserCheck : faUserTimes}
      />
    </div>
  );
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faUser as fasUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import UserManager from "../util/UserManager";

export default function UserIndicator() {
  return (
    <div className={"userindicator"} onClick={() => {}}>
      <FontAwesomeIcon icon={UserManager.isLoggedIn() ? fasUser : farUser} />
    </div>
  );
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { Redirect, BrowserRouter } from "react-router-dom";
import UserManager from "../../util/UserManager";

export default function Admin() {
  if (!UserManager.isLoggedIn() || UserManager.getUsername() !== "admin") {
    return (
      <BrowserRouter>
        <Redirect to="/?status=403" />
      </BrowserRouter>
    );
  }

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

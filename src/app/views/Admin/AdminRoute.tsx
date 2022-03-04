/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "./Admin";
import SystemAdmin from "./SystemAdmin";
import UserManager from "../../util/UserManager";

export default function AdminRoute() {
  if (!UserManager.isLoggedIn() || UserManager.getUsername() !== "admin") {
    return (
      <BrowserRouter>
        <Redirect to="/?status=403" />
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/admin"} component={Admin} />
        <Route exact path={"/admin/system"} component={SystemAdmin} />
      </Switch>
    </BrowserRouter>
  );
}

AdminRoute.displayName = "Admin";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "./Admin";
import SystemAdmin from "./SystemAdmin";
import UserManager from "../../util/UserManager";
import UserAdmin from "./UserAdmin";
import StatsAdmin from "./StatsAdmin";
import IndividualUserAdmin from "./IndividualUserAdmin";
import ProjectAdmin from "./ProjectAdmin";
import IndividualProjectAdmin from "./IndividualProjectAdmin";
import ProjectViewerAdmin from "./ProjectViewerAdmin";

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
        <Route exact path={"/admin/users"} component={UserAdmin} />
        <Route
          exact
          path={"/admin/users/:user"}
          component={IndividualUserAdmin}
        />
        <Route
          exact
          path={"/admin/users/:user/projects"}
          component={ProjectAdmin}
        />
        <Route
          exact
          path={"/admin/users/:user/projects/:project"}
          component={IndividualProjectAdmin}
        />
        <Route exact path={"/admin/stats"} component={StatsAdmin} />
        <Route path={"/admin/*"} component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

AdminRoute.displayName = "Admin";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import LP from "../components/Landingpage/LP";
import MonacoEditor from "../components/Editor/MonacoEditor";
import MainMenu from "./MainMenu";
import InCodeBlock from "../components/Landingpage/InCodeBlock";

export default function LandingPage() {
  return (
    <div className={"lp-container"}>
      <div className={"lp"}>
        <LP.MenuBar />
        <LP.Header />
        <InCodeBlock code={"Erstelle x als Knopf Erstelle"} />
      </div>
    </div>
  );
}
LandingPage.displayName = "LandingPage";

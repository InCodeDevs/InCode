/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import Sidebar from "../../components/Docs/Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro_EN from "../../../docs/intro.mdx";
import Intro_DE from "../../../docs/de/intro.mdx";
import OpenSource_DE from "../../../docs/de/open-source.mdx";
import Test_DE from "../../../docs/de/test.mdx";

const languages = {
  en: "English",
  de: "Deutsch",
};

export default function Docs() {
  let language: "de" | "en";
  if (window.location.pathname.includes("/de")) {
    language = "de";
  } else {
    language = "en";
  }

  return (
    <div className={"docs"}>
      <Sidebar
        language={{
          code: language,
          name: languages[language],
        }}
      />
      <div className="docs-md">
        <BrowserRouter>
          <Switch>
            <Route
              path={["/docs/de", "/docs/de/intro"]}
              exact
              component={Intro_DE}
            />

            <Route
              path={["/docs/de/open-source"]}
              exact
              component={OpenSource_DE}
            />

            <Route path={["/docs/de/test"]} exact component={Test_DE} />

            <Route
              path={["/docs/en", "/docs/en/intro"]}
              exact
              component={Intro_EN}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

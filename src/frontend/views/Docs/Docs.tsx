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
import Syntax_DE from "../../../docs/de/syntax.mdx";
import NF_DE from "../../../docs/de/not-found.mdx";
import Erstelle_DE from "../../../docs/de/syntax/befehl/erstelle.mdx";
import Setze_DE from "../../../docs/de/syntax/befehl/setze.mdx";
import Rufe_DE from "../../../docs/de/syntax/befehl/rufe.mdx";
import Fuge_DE from "../../../docs/de/syntax/befehl/füge.mdx";

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

            <Route path={"/docs/de/syntax"} exact component={Syntax_DE} />

            <Route
              path={"/docs/de/syntax/befehl/erstelle"}
              exact
              component={Erstelle_DE}
            />

            <Route
              path={"/docs/de/syntax/befehl/setze"}
              exact
              component={Setze_DE}
            />

            <Route
              path={"/docs/de/syntax/befehl/rufe"}
              exact
              component={Rufe_DE}
            />

            <Route
              path={"/docs/de/syntax/befehl/füge"}
              exact
              component={Fuge_DE}
            />

            <Route
              path={["/docs/en", "/docs/en/intro"]}
              exact
              component={Intro_EN}
            />

            <Route path={"*"} component={NF_DE} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

Docs.displayName = "Docs";

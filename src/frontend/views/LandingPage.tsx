/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { BrowserRouter, Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <>
      <BrowserRouter>
        <div>
          <div className={"lp-menubar"}>
            <div className={"lp-menubar-brand"}>
              <img
                src={"/assets/incode-400.png"}
                width={48}
                height={48}
                alt={"Logo"}
              />
              <h1>
                <b>In</b>Code
              </h1>
            </div>
            <div className={"lp-menubar-items"}>
              <Link to={"/editor"}>Editor</Link>
              <Link to={"/docs"}>Dokumentation</Link>
              <Link to={"/playground"}>Playground</Link>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
LandingPage.displayName = "LandingPage";

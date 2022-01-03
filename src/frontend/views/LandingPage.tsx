/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import LP from "../components/Landingpage/LP";

export default function LandingPage() {
  return (
    <div className={"lp"}>
      <LP.Header />
    </div>
  );
}

LandingPage.displayName = "LandingPage";

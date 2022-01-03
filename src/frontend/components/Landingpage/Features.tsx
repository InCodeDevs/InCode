/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Feature from "./Feature";

export default function Features() {
  return (
    <>
      <div className={"lp-features"}>
        <Feature icon={"fas fa-code"} title={"Editor"} url={"/editor"} />
      </div>
    </>
  );
}

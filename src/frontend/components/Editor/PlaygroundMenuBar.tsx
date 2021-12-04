/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import MenuItem from "../Menu/MenuItem";
import { faRunning } from "@fortawesome/free-solid-svg-icons";

export default function PlaygroundMenuBar() {
  return (
    <>
      <MenuItem icon={faRunning} onclick={() => {}} title={"Run"} />
    </>
  );
}

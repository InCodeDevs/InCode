/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import MenuItem from "./MenuItem";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";

interface Props {
  input: string | string[];
}

export default function PassGenMenuItem(props: Props) {
  return (
    <MenuItem
      // @ts-ignore
      icon={faKey}
      title={"menu.login.generate"}
      onclick={() => {
        let inputs = [];
        if (typeof props.input === "string") {
          inputs.push(props.input);
        } else {
          inputs = props.input;
        }

        const password = UserManager.generateSafePassword();

        inputs.forEach((input) => {
          (document.getElementById(input) as HTMLInputElement).value = password;
          (document.getElementById(input) as HTMLInputElement).type = "text";
        });
      }}
    />
  );
}

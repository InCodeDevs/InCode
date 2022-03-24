/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Title from "../Title";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function SettingsView(props: Props) {
  return (
    <div className={"settings-view"}>
      <Title size={1} title={props.title} centered />
      {props.children}
    </div>
  );
}

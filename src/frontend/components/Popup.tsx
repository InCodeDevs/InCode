/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { ReactElement } from "react";
import Title from "./Title";
import Text from "./Text";

interface Props {
  type: "Alert" | "Question" | "Confirm";
  title: string;
  description: ReactElement | ReactElement[] | string;
  callback?: (result?: any) => void;
}

export default function Popup(props: Props) {
  return (
    <div className={"popup"}>
      <Title className={"popup-title"} size={1} title={props.title} centered />
      <Text nol18n>{props.description}</Text>
    </div>
  );
}

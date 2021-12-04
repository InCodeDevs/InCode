/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";

export interface InputProps {
  type: string;
  id: string;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      className={"input"}
      id={props.id}
      placeholder={props.placeholder || ""}
    />
  );
}

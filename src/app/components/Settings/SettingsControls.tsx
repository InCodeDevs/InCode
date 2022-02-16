/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";

export default function SettingsControls(props: { children: React.ReactNode }) {
  return <div className="settings-controls">{props.children}</div>;
}

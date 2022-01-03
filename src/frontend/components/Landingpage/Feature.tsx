/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "../../util/UIManager";

interface Props {
  icon: string;
  title: string;
  url: string;
}

export default function Feature(props: Props) {
  return (
    <div
      className="lp-feature"
      onClick={() => UIManager.silentRedirect(props.url)}
    >
      <div className="lp-feature-icon">
        <i className={props.icon} />
      </div>
      <div className="lp-feature-title">{props.title}</div>
    </div>
  );
}

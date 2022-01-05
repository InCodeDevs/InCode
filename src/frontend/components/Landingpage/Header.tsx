/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import LP from "./LP";
import Container from "../Container";
import UIManager from "../../util/UIManager";

interface Props {
  children: React.ReactNode;
}

export default function Header(props: Props) {
  return (
    <>
      <div className="lp-header">
        <div className={"lp-header-container"}>
          <div className="lp-header-title">
            <span>Einfach Programmieren</span>
          </div>
          <div className="lp-buttons">
            <LP.Button
              title={"Editor"}
              color={"primary"}
              onClick={() => {
                UIManager.silentRedirect("/editor");
              }}
            />
            <LP.Button
              title={"Dokumentation"}
              color={"primary"}
              onClick={() => {
                UIManager.silentRedirect("/docs");
              }}
            />
            <LP.Button
              title={"Playground"}
              color={"primary"}
              onClick={() => {
                UIManager.silentRedirect("/playground");
              }}
            />
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "../../util/UIManager";
import Title from "../Title";
import Sidebar_DE from "../../../docs/de/sidebar.mdx";
import { BrowserRouter } from "react-router-dom";

interface Props {
  language: {
    code: "en" | "de";
    name: string;
  };
}

export default function Sidebar(props: Props) {
  let sidebar: React.ReactElement = <></>;
  switch (props.language.code) {
    case "en":
      sidebar = <Sidebar_DE />;
      break;
    case "de":
      sidebar = <Sidebar_DE />;
      break;
    default:
      sidebar = <Sidebar_DE />;
  }
  return (
    <div className={"docs-sidebar"}>
      <BrowserRouter>{sidebar}</BrowserRouter>
    </div>
  );
  /*return (
    <div className="docs-sidebar">
      <Title title={"docs.name"} size={1} className="sidebar-title" />
    </div>
  );*/
}

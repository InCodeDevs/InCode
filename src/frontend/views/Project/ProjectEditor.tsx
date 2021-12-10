/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import { MonacoProps } from "../../components/Editor/MonacoEditor";
import { ProjectConfig } from "../../types/ProjectConfig";

interface Props {
  monaco?: MonacoProps;
  project: ProjectConfig;
}

export default function ProjectEditor() {
  return <></>;
}

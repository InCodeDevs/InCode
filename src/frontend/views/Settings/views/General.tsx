/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../../components/Container";
import Title from "../../../components/Title";

export default function General() {
  return (
    <>
      <Container centeredRelative>
        <Title size={1} title={"name"} />
      </Container>
    </>
  );
}

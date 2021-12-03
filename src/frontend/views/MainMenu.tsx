/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import l18n from "../util/l18n";
import Container from "../components/Container";
import Title from "../components/Title";

export default function MainMenu() {
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered>
          {l18n.translate("name")}
        </Title>
      </Container>
    </>
  );
}

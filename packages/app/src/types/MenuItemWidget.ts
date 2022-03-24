/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface MenuItemWidget {
  icon: IconDefinition;
  color: string;
  onclick: () => void;
  name: string;
}

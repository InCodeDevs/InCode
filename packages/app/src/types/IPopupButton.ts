/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface IPopupButton {
  text: string;
  onClick: () => void;
  variant?: "standard" | "green" | "red";
}

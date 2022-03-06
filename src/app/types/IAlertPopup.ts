/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { ReactElement } from "react";
import { IPopupButton } from "./IPopupButton";
import { IPopupEvents } from "./IPopupEvents";

export interface IAlertPopup extends IPopupEvents {
  title: string;
  description: JSX.Element | ReactElement | ReactElement[] | string;
  buttons?: IPopupButton[];
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { ReactElement } from "react";
import { IPopupEvents } from "./IPopupEvents";

export interface IConfirmPopup extends IPopupEvents {
  title: string;
  description: JSX.Element | ReactElement | ReactElement[] | string;
  onAgree?: () => void;
  onDisagree?: () => void;
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface IPopupEvents {
  willClose?: () => void;
  didClose?: () => void;
  willLoad?: () => void;
  didLoad?: () => void;
}

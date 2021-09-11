/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export type Props = {
  title: string;
  areas: Area[];
  // entries: Entry[];
  buttons: {
    mainMenu: boolean;
    custom: Button[];
  };
};

export type Button = {
  title: string;
  callback: () => void;
};

export type Area = {
  title: string;
  id: string;
};

export type Entry = {
  title: string;
  area: string;
  imageURL: string;
  callback: () => void;
  badge: boolean;
  badgeType?: "verified" | "cloud",
};

export type State = {};

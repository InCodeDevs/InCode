/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface SettingsController {
  setting: string;
  description: string;
  icon: IconDefinition;
  title: string;
}

export interface SettingsTextController extends SettingsController {}

export interface SettingsNumberController extends SettingsController {
  min: number;
  max: number;
}

export interface SettingsBooleanController extends SettingsController {}

export interface SettingsSelectController extends SettingsController {
  options: string[];
}

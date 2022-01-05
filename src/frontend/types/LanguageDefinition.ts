/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface LanguageDefinition {
  patterns: {
    name: string;
    match: RegExp[];
    style?: {
      color?: string;
      fontFamily?: string;
      fontStyle?: string;
    };
  }[];
}

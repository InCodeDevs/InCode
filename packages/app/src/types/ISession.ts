/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export interface ISession {
  sid: string;
  projectAP: string;
  users: string[];
  createdAt: Date;
  currentData: string;
  secret: string;
}

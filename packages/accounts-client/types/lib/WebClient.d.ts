/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
export class WebClient {
  constructor(rootUrl: any);
  login(username: any, password: any): Promise<boolean>;
  create(username: any, password: any): Promise<boolean>;
  delete(username: any, password: any): Promise<boolean>;
  updateUsername(
    username: any,
    password: any,
    newUsername: any
  ): Promise<boolean>;
  updatePassword(
    username: any,
    password: any,
    newPassword: any
  ): Promise<boolean>;
  storeData_u(
    username: any,
    password: any,
    data: any,
    dataName: any
  ): Promise<boolean>;
  deleteData_u(username: any, password: any, dataName: any): Promise<boolean>;
  getData_u(username: any, password: any, dataName: any): Promise<any>;
  getAllData_u(username: any, password: any): Promise<any>;
  existsUser(username: any): Promise<any>;
  storeData(
    username: any,
    password: any,
    data: any,
    dataName: any
  ): Promise<boolean>;
  deleteData(username: any, password: any, dataName: any): Promise<boolean>;
  getData(
    username: any,
    password: any,
    dataName: any,
    hash?: boolean
  ): Promise<any>;
  allowDataAccess(
    username: any,
    password: any,
    dataName: any,
    newUser: any
  ): Promise<boolean>;
  disallowDataAccess(
    username: any,
    password: any,
    dataName: any,
    newUser: any
  ): Promise<boolean>;
  getAllowedUsers(username: any, password: any, dataName: any): Promise<any>;
  createPostBox(username: any, password: any, name: any): Promise<boolean>;
  deletePostBox(username: any, password: any, name: any): Promise<boolean>;
  addToPostBox(
    username: any,
    password: any,
    name: any,
    owner: any,
    entry: any
  ): Promise<boolean>;
  removeFromPostBox(
    username: any,
    password: any,
    name: any,
    at: any
  ): Promise<boolean>;
  clearPostBox(username: any, password: any, name: any): Promise<boolean>;
  readPostBox(username: any, password: any, name: any): Promise<any>;
  existsPostBox(owner: any, name: any): Promise<boolean>;
  createToken(username: any, password: any): Promise<any>;
  #private;
}

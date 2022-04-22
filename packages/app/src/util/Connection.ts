/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class Connection {
  public static canConnect = false;

  public static runTask() {
    setInterval(Connection.update, 10000);
  }

  public static async update() {
    const response = await fetch("https://account.craftions.net/api/v1");
    Connection.canConnect = response.status === 200;
  }
}

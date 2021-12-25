/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class PushNotificationManager {
  public static applicationServerKey =
    "BGSd5yhX1kxnjJLJS_aczhnXZug3GDM0CZXJe6UtiTKUIub6z50Z_qIGt2wJYMgbHxxk21zSs8S3rdr0EtQblO4";

  public static async subscribe() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PushNotificationManager.applicationServerKey,
    });
    console.log(JSON.stringify(push));
  }
}

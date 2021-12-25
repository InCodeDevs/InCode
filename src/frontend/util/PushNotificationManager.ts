/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import UserManager from "./UserManager";

export default class PushNotificationManager {
  public static applicationServerKey =
    "BGSd5yhX1kxnjJLJS_aczhnXZug3GDM0CZXJe6UtiTKUIub6z50Z_qIGt2wJYMgbHxxk21zSs8S3rdr0EtQblO4";

  public static async subscribe() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PushNotificationManager.applicationServerKey,
    });
    await fetch("/api/v1/push/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserManager.getUsername(),
        token: UserManager.getToken(),
        subscription: push,
      }),
    });
  }
}

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class ServiceWorker {
  private static serviceWorkerRegistration: ServiceWorkerRegistration;

  public static check(): boolean {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  public static async register(): Promise<ServiceWorkerRegistration> {
    const swRegistration = await navigator.serviceWorker.register(
      "/serviceWorker.js"
    );
    this.serviceWorkerRegistration = swRegistration;
    return swRegistration;
  }

  public static getRegistration(): ServiceWorkerRegistration {
    return this.serviceWorkerRegistration;
  }
}

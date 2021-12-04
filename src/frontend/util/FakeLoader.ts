/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class FakeLoader {
  public static show() {
    const fakeLoader = document.getElementById(
      "fake_loader_wrapper"
    ) as HTMLDivElement;
    fakeLoader.classList.add("active");
  }

  public static hide() {
    const fakeLoader = document.getElementById(
      "fake_loader_wrapper"
    ) as HTMLDivElement;
    fakeLoader.classList.remove("active");
  }
}

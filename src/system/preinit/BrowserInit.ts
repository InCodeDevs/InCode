/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import { InCodeInit } from "./InCodeInit";

export class BrowserInit extends InCodeInit {
  // TODO: Legacy Version of the editor (for IE, Old Edge and Safari)

  init(): void {
    (document.getElementById("copyright") as HTMLElement).style.display =
      "block";
    (document.getElementById("noscript") as HTMLElement).style.display = "none";
  }
}

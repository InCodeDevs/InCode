/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import { InCodeInit } from "./InCodeInit";

export class ThemeLoader extends InCodeInit {
  init(): void {
    switch (localStorage.getItem("incode-editor.theme")) {
      case "dark":
        require("../../styles/themes/dark/_index.scss");
        break;
      case "light":
        require("../../styles/themes/light/_index.scss");
        break;
      case "twitch":
        require("../../styles/themes/twitch/_index.scss");
        break;
      case "discord":
        require("../../styles/themes/discord/_index.scss");
        break;
      case "youtube":
        require("../../styles/themes/youtube/_index.scss");
        break;
      case "vscode-dark":
        require("../../styles/themes/vscode-dark/_index.scss");
        break;
      case "whatsapp":
        require("../../styles/themes/whatsapp/_index.scss");
        break;
      default:
        require("../../styles/themes/dark/_index.scss");
        break;
    }

    if (localStorage.getItem("incode-editor.enableAnimations") === "true") {
      require("../../styles/animations/_index.scss");
    }

    require("../../styles/incode.scss");
  }
}

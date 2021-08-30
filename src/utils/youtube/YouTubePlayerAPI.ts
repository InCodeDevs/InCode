/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import YouTubePlayer from "youtube-player";

import { YouTubePlayer as Player } from "youtube-player/dist/types";

export class YouTubePlayerAPI {
  protected static player: Player;

  public static initialize() {
    this.player = YouTubePlayer("yt-video", {
      playerVars: {
        controls: 0,
      },
    });
  }

  public static play(id: string, callback: () => void) {
    this.player.loadVideoById(id, 0, "highres");

    this.player.playVideo();

    (document.getElementById("yt-video") as HTMLIFrameElement).width = "1280";
    (document.getElementById("yt-video") as HTMLIFrameElement).height = "720";

    this.player.on("stateChange", (event) => {
      (document.getElementById("yt-video") as HTMLIFrameElement).style.width =
        "1280";
      (document.getElementById("yt-video") as HTMLIFrameElement).style.height =
        "720";
      if (event.data === 0) callback();
    });
  }
}

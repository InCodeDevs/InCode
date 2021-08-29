/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import YouTubePlayer from "youtube-player";

import {YouTubePlayer as Player} from 'youtube-player/dist/types';

export class YouTubeUtil {

    protected static player: Player;

    public static init() {
        this.player = YouTubePlayer('yt-video');
    }

    public static play(id: string, callback: () => void) {

        this.player.loadVideoById(id);

        this.player.playVideo();

        this.player.on('ready', () => {
            this.player.setPlaybackQuality("hd720");
            (document.getElementById('yt-video') as HTMLIFrameElement).width = "1280";
            (document.getElementById('yt-video') as HTMLIFrameElement).height = "720";
        })

        this.player.on('stateChange', (event) => {
            if(event.data === 0)
                callback();
        })
    }
}
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {ObjectDefinition} from "../../Registry";

export class YouTubeAPI {

    public static readonly API_KEY = 'AIzaSyAddGuPMEao5Ngv60cX9iXn3pziHclmLnI';

    public static getPlayListContent(playListId: string, callback: (data: ObjectDefinition) => void) {
        fetch(`https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=${playListId}&part=contentDetails&maxResults=128&key=${this.API_KEY}`)
            .then(response => response.json())
            .then(data => callback(data));
    }

    public static getPlayListVideos(playListId: string, callback: (videos: string[]) => void) {
        this.getPlayListContent(playListId, (d) => {
            let videos: string[] = [];

            (d.items as ObjectDefinition[]).forEach(x => {
                videos.push(x.contentDetails.videoId)
            })

            callback(videos)
        });
    }

    public static getVideoThumbnail(videoId: string, callback: (image: string) => void, size: string) {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${this.API_KEY}`)
            .then(response => response.json())
            .then(data => {
                callback(data.items[0].snippet.thumbnails[size].url);
            })
    }

    public static getVideoTitle(videoId: string, callback: (title: string) => void) {
        this.getVideoSnippetInfo(videoId, "title", (title0) => {
            callback(title0);
        })
    }

    public static getVideoSnippetInfo(videoId: string, snippetName: string, callback: (info: string) => void) {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${this.API_KEY}`)
            .then(response => response.json())
            .then(data => {
                callback(data.items[0].snippet[snippetName]);
            })
    }
}
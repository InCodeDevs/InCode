/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import * as React from "react";
import { CourseProps, CourseState } from "../../types/Couse";
import { YouTubeAPI } from "../../utils/youtube/YouTubeAPI";
import { YouTubePlayerAPI } from "../../utils/youtube/YouTubePlayerAPI";

export class Course extends React.Component<CourseProps, CourseState> {
  render() {
    return (
      <div className={"tutorials"}>
        <div className={"tutorials-sidebar"}>
          <h3 className={"tutorials-sidebar-title"}>{this.props.title}</h3>
          <div className={"tutorials-sidebar-entries"} />
        </div>
        <div className={"tutorials-content"}>
          <h3 className={"tutorials-section-title"}>Kein Tutorial geöffnet!</h3>
          <div id={"tutorials-status"}>
            <h4 style={{ color: "red" }}>
              Du hast noch kein Tutorial geöffnet. Klicke Links auf ein Tutorial
              um es dir anzuschauen!
            </h4>
          </div>
          <div id={"yt-video"} />
          <br />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (localStorage.getItem("incode-editor.tutorials.watched") === null)
      localStorage.setItem(
        "incode-editor.tutorials.watched",
        JSON.stringify({ videos: [] })
      );

    YouTubePlayerAPI.initialize();

    (document.getElementById("yt-video") as HTMLElement).style.display = "none";

    const playlistId =
      this.props.type === "code"
        ? "PLacRKOx6ODPLn8O4krv2qg0QHY2jAXvOc"
        : "PLacRKOx6ODPJk8AAxht35g87XhNLLboDO";

    YouTubeAPI.getPlayListVideos(playlistId, (videos) => {
      videos.forEach((id) => {
        const div = document.createElement("div");
        const title = document.createElement("span");
        const img = document.createElement("img");

        if (
          JSON.parse(
            localStorage.getItem("incode-editor.tutorials.watched") as string
          ).videos.includes(id)
        ) {
          title.style.textDecoration = "line-through";
        }

        img.classList.add("tutorials-entry-img");
        title.classList.add("tutorials-entry-title");

        img.src = "assets/loading.gif";
        img.width = 64;
        img.height = 64;

        YouTubeAPI.getVideoTitle(id, (title0) => {
          title.innerText = title0;
        });

        YouTubeAPI.getVideoThumbnail(
          id,
          (image) => {
            img.src = image;
            img.width = 120;
            img.height = 90;
          },
          "high"
        );

        div.appendChild(img);
        div.appendChild(title);

        div.addEventListener("click", () => {
          (
            document.getElementById("tutorials-status") as HTMLElement
          ).style.display = "none";
          (document.getElementById("yt-video") as HTMLElement).style.display =
            "block";
          (
            document.getElementsByClassName(
              "tutorials-section-title"
            )[0] as HTMLElement
          ).innerText = title.innerText;
          YouTubePlayerAPI.play(id, () => {
            (document.getElementById("yt-video") as HTMLElement).style.display =
              "none";

            (
              document.getElementById("tutorials-status") as HTMLElement
            ).style.display = "block";
            (
              document.getElementById("tutorials-status") as HTMLElement
            ).innerHTML =
              "<h4 style='color: #08d008'>Herzlichen Glückwunsch!</h4>" +
              "<h5>Du hast die Lektion <code>" +
              title.innerText +
              "</code> abgeschlossen! </h5>";

            const w = JSON.parse(
              localStorage.getItem("incode-editor.tutorials.watched") as string
            );

            if (!w.videos.includes(id)) w.videos.push(id);

            localStorage.setItem(
              "incode-editor.tutorials.watched",
              JSON.stringify(w)
            );
            title.style.textDecoration = "line-through";
          });
        });

        (
          document.getElementsByClassName(
            "tutorials-sidebar-entries"
          )[0] as HTMLUListElement
        ).appendChild(div);
      });
    });
  }
}

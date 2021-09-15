/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { Entry, Props, State } from "../../types/SearchScreen";
import { Area } from "./SearchScreen/Area";
import { UIManager } from "../../utils/UIManager";
import { MainMenu } from "../MainMenu";

export class SearchScreen extends React.Component<Props, State> {
  public static entries: Entry[] = [];

  public static manualUpdate() {
    (document.getElementById("b-1ke") as HTMLButtonElement).click();
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button
          style={{ display: "none" }}
          id={"b-1ke"}
          onClick={() => {
            this.updateEntries(SearchScreen.entries);
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          <h1 style={{ color: "#F8F9FAFF", flex: "55%", textAlign: "right" }}>
            {this.props.title}
          </h1>
          <div
            style={{ flex: "45%", display: "flex", justifyContent: "right" }}
          >
            {this.props.buttons.custom.map((b) => {
              return (
                <Button
                  variant={"outline-flat"}
                  size={"xxl"}
                  style={{
                    marginRight: "1.5rem",
                  }}
                  onClick={b.callback}
                >
                  {b.title}
                </Button>
              );
            })}
            {this.props.buttons.mainMenu && (
              <Button
                variant={"outline-flat"}
                size={"xxl"}
                style={{
                  marginRight: "1.5rem",
                }}
                onClick={() => {
                  UIManager.showComponent(<MainMenu />);
                }}
              >
                Hauptmenü
              </Button>
            )}
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form.Control
            type={"text"}
            placeholder={"Suchen..."}
            style={{
              width: "30%",
              fontSize: "1.5rem",
            }}
            id={"search-bar"}
            onChange={() => {
              const term = (
                document.getElementById("search-bar") as HTMLInputElement
              ).value.trim();
              if (term.length > 0) {
                const ent: Entry[] = [];
                SearchScreen.entries.forEach((e) => {
                  if (e.title.toLowerCase().includes(term.toLowerCase())) {
                    ent.push(e);
                  }
                });
                console.log(ent);
                this.updateEntries(ent);
              } else {
                this.updateEntries(SearchScreen.entries);
              }
            }}
          />
        </div>
        <div style={{ display: "flex", width: "100%", marginTop: "2%" }}>
          {this.props.areas.map((a) => {
            return <Area title={a.title} id={a.id} />;
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.updateEntries(SearchScreen.entries);
  }

  updateEntries(entries: Entry[]) {
    this.props.areas.forEach((area) => {
      (document.getElementById(area.id) as HTMLDivElement).innerHTML =
        "<h2>" + area.title + "</h2>";
    });

    entries.forEach((e) => {
      const element = document.createElement("div");
      element.classList.add("template");

      element.addEventListener("click", e.callback);

      const badge = document.createElement("span");
      badge.classList.add("verified");

      if (e.badgeType === "cloud") {
        badge.innerText = "☁";
        badge.classList.add("verified-cloud");
      } else {
        badge.innerText = "✓";
      }

      if (!e.badge) {
        badge.style.visibility = "hidden";
      }

      const image = document.createElement("img");
      image.width = 128;
      image.height = 128;
      image.src = e.imageURL;

      const h5 = document.createElement("h5");
      h5.classList.add("template-name");
      h5.innerText = e.title;

      element.appendChild(badge);
      element.appendChild(image);
      element.appendChild(h5);

      (
        document.getElementById(e.area.toLowerCase()) as HTMLDivElement
      ).appendChild(element);
    });
  }
}

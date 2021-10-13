/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Language } from "../../utils/international/Language";
import { Button } from "react-bootstrap";
import { Registry } from "../../utils/Registry";
import { WebClient } from "@incodelang/accounts-client";
import "./style.scss";
import { UserUtil } from "../../utils/UserUtil";
import { IObject } from "../../utils/interface/IObject";

const User: WebClient = new WebClient("");

export class ProjectInvites extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          <div style={{ flex: "90%" }}>
            <h1 style={{ color: "#F8F9FAFF", textAlign: "center" }}>
              <div style={{ textAlign: "center" }}>
                {Language.a("menu.account.invites.title")}
              </div>
            </h1>
          </div>
          <div style={{ flex: "10%" }}>
            <Button
              variant={"outline-flat"}
              size={"xxl"}
              style={{
                marginRight: "1.5rem",
              }}
              onClick={() => {
                Registry.getRegister(0x10af)();
              }}
            >
              {Language.a("menu.back")}
            </Button>
          </div>
        </div>
        <div style={{ margin: "10%", width: "80%", height: "100%" }}>
          <ul className={"invites-list"} id={"invites-list"}>
            <li className={"invites-list-item"}>
              <h4 className={"invites-list-item-title"}>
                Test Projekt
                <br />
                <span className={"invites-list-item-author"}>mctzock</span>
              </h4>
              <div className={"invites-list-item-controls"}>
                <button
                  className={
                    "invites-list-item-controls-button invites-list-item-controls-button-accept"
                  }
                >
                  Annehmen
                </button>
                <button
                  className={
                    "invites-list-item-controls-button invites-list-item-controls-button-decline"
                  }
                >
                  Ablehnen
                </button>
              </div>
            </li>
            <li className={"invites-list-item"}>
              <h4 className={"invites-list-item-title"}>
                Test Projekt
                <br />
                <span className={"invites-list-item-author"}>mctzock</span>
              </h4>
              <div className={"invites-list-item-controls"}>
                <button
                  className={
                    "invites-list-item-controls-button invites-list-item-controls-button-accept"
                  }
                >
                  Annehmen
                </button>
                <button
                  className={
                    "invites-list-item-controls-button invites-list-item-controls-button-decline"
                  }
                >
                  Ablehnen
                </button>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }

  componentDidMount() {
    User.readPostBox(
      UserUtil.getSavedUser().username,
      UserUtil.getSavedUser().password,
      "p-invites"
    ).then((x) => {
      const container: HTMLUListElement = document.getElementById(
        "invites-list"
      ) as HTMLUListElement;

      container.innerHTML = "";

      if (x.length === 0) {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");

        li.className = "invites-list-item";
        h4.className = "invites-list-item-title";

        h4.innerText = Language.a("menu.account.invites.empty");
        h4.style.textAlign = "center";

        li.appendChild(h4);

        container.append(li);
      } else {
        x.forEach((y: IObject) => {
          const li = document.createElement("li");
          const h4 = document.createElement("h4");
          const br = document.createElement("br");
          const span = document.createElement("span");
          const div = document.createElement("div");

          const acceptButton = document.createElement("button");
          const declineButton = document.createElement("button");

          acceptButton.classList.add(
            "invites-list-item-controls-button",
            "invites-list-item-controls-button-accept"
          );
          declineButton.classList.add(
            "invites-list-item-controls-button",
            "invites-list-item-controls-button-decline"
          );

          acceptButton.innerText = Language.a("menu.accept");
          declineButton.innerText = Language.a("menu.decline");

          declineButton.addEventListener("click", () => {
            User.removeFromPostBox(
              UserUtil.getSavedUser().username,
              UserUtil.getSavedUser().password,
              "p-invites",
              y.at
            ).then(() => {
              this.componentDidMount();
            });
          });

          li.className = "invites-list-item";
          h4.className = "invites-list-item-title";
          span.className = "invites-list-item-author";
          div.className = "invites-list-item-controls";

          span.innerText = y.author;

          h4.innerText = y.entry.name;
          h4.appendChild(br);
          h4.appendChild(span);

          div.appendChild(acceptButton);
          div.appendChild(declineButton);

          li.appendChild(h4);
          li.appendChild(div);

          container.append(li);
        });
      }
    });
  }
}

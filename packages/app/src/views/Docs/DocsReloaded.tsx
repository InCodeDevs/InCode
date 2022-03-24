/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { useEffect, useLayoutEffect } from "react";
import { JSONObject } from "../../types/JSONObject";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import i18n from "../../util/i18n";
import UIManager from "../../util/UIManager";

export default function DocsReloaded() {
  const path = window.location.pathname;

  const language = path.split("/")[2];
  const filePath = path.split("/").slice(3).join("/") + ".md";

  const fileUrl = "/api/v1/docs/" + language + "/" + filePath;

  useLayoutEffect(() => {
    fetch("/api/v1/docs/index.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((data) => {
        let found = false;
        let lng: JSONObject = {};
        data.languages.forEach((ln: JSONObject) => {
          if (ln.code === language) {
            found = true;
            lng = ln;
          }
        });
        if (!found) {
          PopupManagerReloaded.alert({
            title: i18n.translate("docs.error.language.not-found.title"),
            description: i18n.translate(
              "docs.error.language.not-found.description"
            ),
            didClose: () => {
              UIManager.silentRedirect(path.replace(language, "de"));
            },
          });
        } else {
          fetch(fileUrl, {
            method: "GET",
          }).then(async (res) => {
            if (res.status === 200) {
              const text = await res.text();
              setContent(text);
            } else {
              UIManager.silentRedirect(path + "/intro");
            }
          });
          fetch("/api/v1/docs/" + lng.sidebar, {
            method: "GET",
          }).then(async (res) => {
            if (res.status === 200) {
              const json = (await res.json()) as JSONObject;
              let sb = "# " + json.title + "\n\n";
              json.items.forEach((item: JSONObject) => {
                sb += `### [${item.title}](${item.url})\n`;
              });
              setSidebar(sb);
            } else {
              setSidebar("Could not load sidebar");
            }
          });
        }
      })
    );
  }, []);

  useEffect(() => {}, []);

  const [sidebar, setSidebar] = React.useState("# Loading...");
  const [content, setContent] = React.useState("# Loading...");

  return (
    <div className={"docsrl-container"}>
      <div className={"docsrl-sidebar"}>
        <ReactMarkdown>{sidebar}</ReactMarkdown>
      </div>
      <div className={"docsrl-content"}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

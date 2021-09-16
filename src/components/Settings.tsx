/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import {IObject} from "../utils/interface/IObject";

import { UIManager } from "../utils/UIManager";
import { MainMenu } from "./MainMenu";
import { Button, Form } from "react-bootstrap";
import { SettingsScreen } from "./util/SettingsScreen";
import { Entry } from "../types/SettingsScreen";
import { Themes } from "../utils/Themes";
import {Language} from "../utils/international/Language";

export class Settings extends React.Component {
  public static readonly config: IObject = {
    theme: {
      display: Language.a("settings.theme"),
      callback: () => {
        const themes: Entry[] = [];

        Object.keys(Themes.themes).forEach((t) => {
          const theme = Themes.themes[t];

          const entry: Entry = {
            title: theme.display,
            imageURL: "assets/code-editor-light.png",
            callback: () => {
              localStorage.setItem("incode-editor.theme", t);
              window.location.reload();
            },
          };

          if (theme.scheme === "dark") {
            entry.imageURL = "assets/code-editor.png";
          } else if (theme.scheme === "pride") {
            entry.imageURL = "assets/pride.png";
          }

          themes.push(entry);
        });

        UIManager.showComponent(
          <SettingsScreen title={Language.a("settings.theme")} settings={themes} />
        );
      },
      icon: "assets/code-editor.png",
    },
    animations: {
      display: Language.a("settings.animation"),
      callback: () => {
        UIManager.showComponent(
          <SettingsScreen
            title={Language.a("settings.animation")}
            settings={[
              {
                title: Language.a("settings.activate"),
                callback: () => {
                  localStorage.setItem(
                    "incode-editor.enableAnimations",
                    "true"
                  );
                  window.location.reload();
                },
                imageURL: "assets/check.png",
              },
              {
                title: Language.a("settings.deactivate"),
                callback: () => {
                  localStorage.setItem(
                    "incode-editor.enableAnimations",
                    "false"
                  );
                  window.location.reload();
                },
                imageURL: "assets/x.png",
              },
            ]}
          />
        );
      },
      icon: "https://user-images.githubusercontent.com/53553315/116579197-71484800-a912-11eb-8d6e-17cc50d8027d.png",
    },
    storage: {
      display: Language.a("settings.storage"),
      callback: () => {
        UIManager.showComponent(
          <SettingsScreen
            title={Language.a("settings.storage")}
            settings={[
              {
                title: Language.a("settings.storage.delete"),
                callback: () => {
                  UIManager.ask(
                    "<h1>" + Language.a("menu.continue") + "</h1>" +
                      "<h4>" + Language.a("settings.storage.delete.confirm") + "</h4>",
                    () => {
                      for (let i = 0; i < localStorage.length; i++) {
                        localStorage.removeItem(localStorage.key(i) as string);
                      }
                      window.location.reload();
                    }
                  );
                },
                imageURL: "assets/x.png",
              },
              {
                title: Language.a("settings.settings.delete"),
                callback: () => {
                  UIManager.ask(
                    "<h1>" + Language.a("menu.continue") + "</h1>" +
                      "<h4>" + Language.a("settings.settings.delete.confirm") + "</h4>",
                    () => {
                      localStorage.removeItem("incode-editor.theme");
                      localStorage.removeItem("incode-editor.enableAnimations");
                      window.location.reload();
                    }
                  );
                },
                imageURL: "assets/x.png",
              },
            ]}
          />
        );
      },
      icon: "assets/settings.png",
    },
  };

  public static updateSettings(settings: IObject = { ex: true }) {
    (document.getElementById("settings") as HTMLDivElement).innerHTML =
      "<h2>" + Language.a("settings.name") + "</h2>";

    let a2u: IObject;

    if (settings.ex !== true) {
      a2u = settings;
    } else {
      a2u = Settings.config;
    }

    Object.keys(a2u).forEach((s) => {
      const setting = a2u[s];

      const element = document.createElement("div");
      element.classList.add("template");

      element.addEventListener("click", () => {
        setting.callback();
      });

      const image = document.createElement("img");
      image.width = 128;
      image.height = 128;

      image.src = setting.icon;

      const h5 = document.createElement("h5");
      h5.classList.add("template-name");
      h5.innerText = setting.display;

      element.appendChild(image);
      element.appendChild(h5);

      (document.getElementById("settings") as HTMLDivElement).appendChild(
        element
      );
    });
  }

  public static search() {
    const term = (
      document.getElementById("search-bar") as HTMLInputElement
    ).value.trim();
    if (term.length > 0) {
      const settings: IObject = {};
      Object.keys(Settings.config).forEach((t) => {
        const setting = Settings.config[t];
        if (
          t.toLowerCase().includes(term.toLowerCase()) ||
          setting.display.toLowerCase().includes(term.toLowerCase())
        )
          settings[t] = setting;
      });
      Settings.updateSettings(settings);
    } else {
      Settings.updateSettings();
    }
  }

  render() {

    Settings.config.theme.display = Language.a("settings.theme")
    Settings.config.animations.display = Language.a("settings.animation")
    Settings.config.storage.display = Language.a("settings.storage")

    return (
      <>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
            <h1 style={{ color: "#F8F9FAFF", flex: "55%", textAlign: "right" }}>
              {
                Language.a("product.name")
              }
            </h1>
            <div style={{ flex: "45%", display: "flex" }}>
              <span style={{ flex: "75%" }} />
              <div style={{ flex: "25%" }}>
                <Button
                  variant={"outline-flat"}
                  size={"xxl"}
                  onClick={() => {
                    UIManager.showComponent(<MainMenu />);
                  }}
                >
                  {Language.a("menu.main")}
                </Button>
              </div>
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
              placeholder={Language.a("menu.search.placeholder")}
              style={{
                width: "30%",
                fontSize: "1.5rem",
              }}
              id={"search-bar"}
              onChange={Settings.search}
            />
          </div>
          <div style={{ display: "flex", width: "100%", marginTop: "2%" }}>
            <div style={{ flex: "100%", color: "white" }} id={"settings"}>
              <h2>{Language.a("settings.name")}</h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    Settings.updateSettings();
  }
}

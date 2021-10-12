/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { UIManager } from "../../utils/UIManager";
import { WebClient } from "@incodelang/accounts-client";
import { UserUtil } from "../../utils/UserUtil";
import { MainMenu } from "../MainMenu";
import { Registry } from "../../utils/Registry";
import { Language } from "../../utils/international/Language";

const User: WebClient = new WebClient("");

export class SelectLoginOption extends React.Component {
  render() {
    return (
      <>
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#F8F9FAFF" }}>
            {Language.a("menu.account.login")}
          </h1>

          <div className={"menu-choose-editors-root"}>
            <div className={"menu-choose-editor"} onClick={this.login}>
              <img
                src={"assets/editor-open-project.png"}
                width={128}
                height={128}
              />
              <p className={"menu-editor-description"}>
                {Language.a("menu.account.login")}
              </p>
            </div>
            <div className={"menu-choose-editor"} onClick={this.register}>
              <img
                src={"assets/editor-create-project.png"}
                width={128}
                height={128}
              />
              <p className={"menu-editor-description"}>
                {Language.a("menu.account.register")}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  login() {
    function x() {
      UIManager.prompt(
        "<h1>" +
          Language.a("menu.account.login") +
          "</h1><h4>" +
          Language.a("menu.account.enter.username") +
          "</h4>",
        (username) => {
          UIManager.prompt(
            "<h1>" +
              Language.a("menu.account.login") +
              "</h1><h4>" +
              Language.a("menu.account.enter.password") +
              "</h4>",
            async (password) => {
              const status = await UserUtil.loginAndSave(username, password);
              if (status) {
                UIManager.alert(
                  "<h1>" +
                    Language.a("menu.success") +
                    "</h1><h4>" +
                    Language.a("menu.account.success").replace("%1", username) +
                    "</h4>",
                  () => {
                    if (Registry.getRegister(0x10af)) {
                      Registry.getRegister(0x10af)();
                    } else {
                      UIManager.showComponent(<MainMenu />);
                    }
                  }
                );
              } else {
                UIManager.alert(
                  "<h1>" +
                    Language.a("menu.failed") +
                    "</h1><h4>" +
                    Language.a("menu.account.failed") +
                    "</h4>",
                  x
                );
              }
            }
          );
        }
      );
    }

    x();
  }

  register() {
    function x() {
      UIManager.prompt(
        "<h1>" +
          Language.a("menu.account.register") +
          "</h1><h4>" +
          Language.a("menu.account.enter.username") +
          "</h4>",
        (username) => {
          p();

          function p() {
            UIManager.prompt(
              "<h1>" +
                Language.a("menu.account.register") +
                "</h1><h4>" +
                Language.a("menu.account.enter.password") +
                "</h4>",
              async (_password) => {
                UIManager.prompt(
                  "<h1>" +
                    Language.a("menu.account.register") +
                    "</h1><h4>" +
                    Language.a("menu.account.enter.password.confirm") +
                    "</h4>",
                  async (password) => {
                    if (password === _password) {
                      await c(username, password);
                    } else {
                      UIManager.alert(
                        "<h1>" +
                          Language.a("menu.failed") +
                          "</h1><h4>" +
                          Language.a("menu.account.failed.password") +
                          "</h4>",
                        () => {
                          p();
                        }
                      );
                    }
                  }
                );
              }
            );
          }

          async function c(username: string, password: string) {
            const createStatus = await User.create(username, password);
            if (createStatus) {
              await UserUtil.loginAndSave(username, password);
              UIManager.alert(
                "<h1>" +
                  Language.a("menu.success") +
                  "</h1><h4>" +
                  Language.a("menu.account.success").replace("%1", username) +
                  "</h4>",
                () => {
                  if (Registry.getRegister(0x10af)) {
                    Registry.getRegister(0x10af)();
                  } else {
                    UIManager.showComponent(<MainMenu />);
                  }
                }
              );
            } else {
              UIManager.alert(
                "<h1>" +
                  Language.a("menu.failed") +
                  "</h1><h4>" +
                  Language.a("menu.account.failed.username") +
                  "</h4>",
                () => {
                  x();
                }
              );
            }
          }
        }
      );
    }

    x();
  }
}

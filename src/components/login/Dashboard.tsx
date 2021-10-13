/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Button } from "react-bootstrap";
import { Language } from "../../utils/international/Language";
import { UIManager } from "../../utils/UIManager";
import { UserUtil } from "../../utils/UserUtil";
import { WebClient } from "@incodelang/accounts-client";
import { Registry } from "../../utils/Registry";
import { ProjectSelector } from "../selector/ProjectSelector";
import { ProjectInvites } from "./ProjectInvites";

const User: WebClient = new WebClient("");

export class Dashboard extends React.Component {
  render() {
    const username: string = UserUtil.getSavedUser().username;

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
                {Language.a("menu.account.title")}
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
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#FAFAFA",
            }}
          >
            {Language.a("menu.account.logged-in-as").replace("%1", username)}
          </h3>
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem" }}
            onClick={this.logout}
          >
            Abmelden
          </Button>
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem" }}
            onClick={this.delete}
          >
            Account Löschen
          </Button>
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem" }}
            onClick={this.changePassword}
          >
            Passwort ändern
          </Button>
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem" }}
            onClick={this.changeName}
          >
            Namen ändern
          </Button>
          <br />
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem" }}
            onClick={this.toggleInvites}
            id={"__acc_btn_toggle_invs"}
          >
            Einladungen&nbsp;
          </Button>
          <Button
            variant={"outline-flat"}
            size={"xxl"}
            style={{ margin: "1.5rem", display: "none" }}
            onClick={this.showInvites}
            id={"__acc_btn_show_invs"}
          >
            Einladungen anzeigen
          </Button>
        </div>
      </>
    );
  }

  componentDidMount() {
    User.existsPostBox(UserUtil.getSavedUser().username, "p-invites").then(
      (x) => {
        let y = x ? "deaktivieren" : "aktivieren";
        (
          document.getElementById("__acc_btn_toggle_invs") as HTMLButtonElement
        ).innerText += y;
        x
          ? ((
              document.getElementById(
                "__acc_btn_show_invs"
              ) as HTMLButtonElement
            ).style.display = "inline-block")
          : ((
              document.getElementById(
                "__acc_btn_show_invs"
              ) as HTMLButtonElement
            ).style.display = "none");
      }
    );
  }

  public logout() {
    UIManager.ask(
      "<h1>" +
        Language.a("menu.account.logout.title") +
        "</h1><h4>" +
        Language.a("menu.account.logout.description") +
        "</h4>",
      () => {
        sessionStorage.removeItem("accounts.actualAccount");

        for (let i = 0; i < localStorage.length; i++) {
          const localStorageKey = localStorage.key(i) as string;
          if (localStorageKey.startsWith("incode-editor.projects")) {
            if (
              JSON.parse(localStorage.getItem(localStorageKey) as string)
                .save !== "local"
            ) {
              localStorage.removeItem(localStorageKey);
            }
          }
        }

        window.location.reload();
      }
    );
  }

  public delete() {
    UIManager.ask(
      "<h1>" +
        Language.a("menu.account.delete.title") +
        "</h1><h4>" +
        Language.a("menu.account.delete.description") +
        "</h4>",
      () => {
        User.delete(
          UserUtil.getSavedUser().username,
          UserUtil.getSavedUser().password
        ).then(() => {
          sessionStorage.setItem(
            "accounts.actualAccount",
            JSON.stringify("{}")
          );
          window.location.reload();
        });
      }
    );
  }

  public changeName() {
    const x = () => {
      UIManager.prompt(
        "<h1>" +
          Language.a("menu.account.change.username.title") +
          "</h1><h4>" +
          Language.a("menu.account.change.username.description") +
          "</h4>",
        (value) => {
          User.updateUsername(
            UserUtil.getSavedUser().username,
            UserUtil.getSavedUser().password,
            value
          ).then((err) => {
            if (!err) {
              x();
            } else {
              const o = JSON.parse(
                sessionStorage.getItem("accounts.actualAccount") as string
              );
              o.username = value;
              sessionStorage.setItem(
                "accounts.actualAccount",
                JSON.stringify(o)
              );
              window.location.reload();
            }
          });
        }
      );
    };
    x();
  }

  public changePassword() {
    const x = () => {
      UIManager.prompt(
        "<h1>" +
          Language.a("menu.account.change.password.title") +
          "</h1><h4>" +
          Language.a("menu.account.change.password.description") +
          "</h4>",
        (value) => {
          User.updatePassword(
            UserUtil.getSavedUser().username,
            UserUtil.getSavedUser().password,
            value
          ).then((err) => {
            if (!err) {
              x();
            } else {
              const o = JSON.parse(
                sessionStorage.getItem("accounts.actualAccount") as string
              );
              o.password = value;
              sessionStorage.setItem(
                "accounts.actualAccount",
                JSON.stringify(o)
              );
              window.location.reload();
            }
          });
        }
      );
    };
    x();
  }

  public async toggleInvites() {
    if (
      await User.existsPostBox(UserUtil.getSavedUser().username, "p-invites")
    ) {
      await User.deletePostBox(
        UserUtil.getSavedUser().username,
        UserUtil.getSavedUser().password,
        "p-invites"
      );
      UIManager.alert(
        "<h1>" +
          Language.a("menu.success") +
          "</h1><h4>" +
          Language.a("menu.account.invites.disabled") +
          "</h4>",
        () => {
          UIManager.showComponent(<Dashboard />);
        }
      );
    } else {
      await User.createPostBox(
        UserUtil.getSavedUser().username,
        UserUtil.getSavedUser().password,
        "p-invites"
      );
      UIManager.alert(
        "<h1>" +
          Language.a("menu.success") +
          "</h1><h4>" +
          Language.a("menu.account.invites.enabled") +
          "</h4>",
        () => {
          UIManager.showComponent(<Dashboard />);
        }
      );
    }
  }

  public showInvites() {
    Registry.putRegister(0x10af, () => {
      UIManager.showComponent(<Dashboard />);
    });
    UIManager.showComponent(<ProjectInvites />);
  }
}

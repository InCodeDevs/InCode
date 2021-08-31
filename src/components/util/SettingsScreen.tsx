/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from "react";
import { Button } from "react-bootstrap";
import { UIManager } from "../../utils/UIManager";
import { Settings } from "../Settings";
import { MainMenu } from "../MainMenu";
import { Props, State } from "../../types/SettingsScreen";

export class SettingsScreen extends React.Component<Props, State> {
  render() {
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
              InCode Editor
            </h1>
            <div style={{ flex: "45%", display: "flex" }}>
              <span style={{ flex: "50%" }} />
              <div style={{ flex: "25%" }}>
                <Button
                  variant={"outline-flat"}
                  size={"xxl"}
                  onClick={() => {
                    UIManager.showComponent(<Settings />);
                  }}
                >
                  Zurück
                </Button>
              </div>
              <div style={{ flex: "25%" }}>
                <Button
                  variant={"outline-flat"}
                  size={"xxl"}
                  onClick={() => {
                    UIManager.showComponent(<MainMenu />);
                  }}
                >
                  Hauptmenü
                </Button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", width: "100%", marginTop: "2%" }}>
            <div style={{ flex: "100%", color: "white" }} id={"themes"}>
              <h2>{this.props.title}</h2>
              {this.props.settings.map((e) => {
                return (
                  <div className={"template"} onClick={e.callback}>
                    <img src={e.imageURL} width={128} height={128} />
                    <h5 className={"template-name"}>{e.title}</h5>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

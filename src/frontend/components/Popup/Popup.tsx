/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { ReactElement } from "react";
import Title from "../Title";
import Text from "../Text";
import PopupManager from "../../util/PopupManager";
import l18n from "../../util/l18n";

interface Props {
  type: "Alert" | "Question" | "Confirm";
  title: string;
  description: ReactElement | ReactElement[] | string;
  callback?: (result?: any) => void;
  useTitleAsText?: boolean;
}

export default function Popup(props: Props) {
  return (
    <div className={"popup"}>
      <Title className={"popup-title"} size={1} title={props.title} centered />
      {props.useTitleAsText ? (
        <Title
          size={4}
          title={props.description as string}
          nol18n
          className={"text"}
          centered
        />
      ) : (
        <Text nol18n>{props.description}</Text>
      )}

      <br />
      {props.type === "Question" ? (
        <div className={"popup-input-wrapper"}>
          <input
            type={"text"}
            id={"question_popup-input"}
            className={"input popup-input"}
          />
        </div>
      ) : (
        ""
      )}
      <div className={"popup-buttons"}>
        {props.type === "Alert" ? (
          <button
            className={"popup-button"}
            onClick={() => {
              PopupManager.disposeAll();
              if (props.callback) {
                props.callback();
              }
            }}
          >
            {l18n.translate("close")}
          </button>
        ) : (
          <>
            <button
              className={"popup-button"}
              onClick={() => {
                PopupManager.disposeAll();
              }}
            >
              {l18n.translate("no")}
            </button>
            <button
              className={"popup-button"}
              onClick={() => {
                if (props.callback) {
                  if (props.type === "Question") {
                    const value = (
                      document.getElementById(
                        "question_popup-input"
                      ) as HTMLInputElement
                    ).value;
                    PopupManager.disposeAll();
                    props.callback(value);
                  } else {
                    PopupManager.disposeAll();
                    props.callback();
                  }
                }
              }}
            >
              {l18n.translate("yes")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

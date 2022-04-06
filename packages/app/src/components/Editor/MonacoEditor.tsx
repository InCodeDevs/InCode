/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { useEffect, useState } from "react";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import Settings from "../../util/Settings";
import { Registry } from "../../util/Registry";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import SocketConnection from "../../util/SocketConnection";
import Workspace from "../../util/Workspace";
import ProjectManager from "../../util/ProjectManager";

export interface MonacoProps {
  mode: "playground" | "project";
  code?: string;
  readonly?: boolean;
  width?: string;
  height?: string;
  public: string | undefined;
}

export default function MonacoEditor(props: MonacoProps) {
  const [code, setCode] = useState(props.code || "");

  loader.config({
    paths: {
      vs: "/assets/scripts/monaco-editor",
    },
  });

  loader.init().then((monaco) => {
    Registry.putRegister(0x01, monaco);

    monaco.languages.register({ id: "incode" });

    monaco.languages.setMonarchTokensProvider("incode", {
      ignoreCase: true,
      tokenizer: {
        root: [
          // root
          [/Importiere/, "root-kw"],
          [/Erstelle/, "root-kw"],
          [/Setze/, "root-kw"],
          [/Rufe/, "root-kw"],
          [/Füge/, "root-kw"],
          [/Wiederhole/, "root-kw"],
          [/Wenn/, "root-kw"],
          [/Sonst/, "root-kw"],
          [/Gib/, "root-kw"],
          [/Frage/, "root-kw"],
          [/Warte/, "root-kw"],
          // sub
          [/den/, "sub-kw"],
          [/die/, "sub-kw"],
          [/das/, "sub-kw"],
          [/der/, "sub-kw"],
          [/von/, "sub-kw"],
          [/auf/, "sub-kw"],
          [/aus/, "sub-kw"],
          [/als/, "sub-kw"],
          [/mal/, "sub-kw"],
          [/solange/, "sub-kw"],
          [/ist/, "sub-kw"],
          [/wird/, "sub-kw"],
          [/und/, "sub-kw"],
          [/speicher/, "sub-kw"],
          [/in/, "sub-kw"],
          [/zum/, "sub-kw"],
          [/zu/, "sub-kw"],
          [/hinzu/, "sub-kw"],
          // operators
          [/kleiner/, "operator"],
          [/größer/, "operator"],
          [/gleich/, "operator"],
          [/kleiner-gleich/, "operator"],
          [/größer-gleich/, "operator"],
          // events
          [/gedrückt/, "event"],
          [/berührt/, "event"],
          [/nicht-berührt/, "event"],
          // types
          [/Knopf/, "type"],
          [/Absatz/, "type"],
          [/Textdekoration/, "type"],
          [/Textausrichtung/, "type"],
          [/Bildschirm/, "type"],
          [/Bild/, "type"],
          [/Überschrift/, "type"],
          [/Eingabefeld/, "type"],
          [/Tabelle/, "type"],
          [/Zeilenumbruch/, "type"],
          [/Zeile/, "type"],
          [/Spalte/, "type"],
          [/Video/, "type"],
          [/Ton/, "type"],
          [/Fenster/, "type"],
          [/Antwort/, "type"],
          [/Konsole/, "type"],
          [/Dialogbox/, "type"],
          [/Wert/, "type"],
          [/Text/, "property"],
          [/Farbe/, "property"],
          [/Methode/, "property"],
          [/Schriftgröße/, "property"],
          [/Schriftart/, "property"],
          [/Schriftstil/, "property"],
          [/Schriftbreite/, "property"],
          [/Quelle/, "property"],
          [/Hintergrundfarbe/, "property"],
          [/Abstand/, "property"],
          [/Abstand-oben/, "property"],
          [/Abstand-rechts/, "property"],
          [/Abstand-unten/, "property"],
          [/Abstand-links/, "property"],
          [/Innerer-Abstand/, "property"],
          [/Innerer-Abstand-oben/, "property"],
          [/Innerer-Abstand-rechts/, "property"],
          [/Innerer-Abstand-unten/, "property"],
          [/Innerer-Abstand-links/, "property"],
          [/Id/, "property"],
          [/Breite/, "property"],
          [/Höhe/, "property"],
          [/Rahmenbreite/, "property"],
          [/Rahmenhöhe/, "property"],
          [/Position/, "property"],
          [/Umrandungsbreite-oben/, "property"],
          [/Umrandungsbreite-rechts/, "property"],
          [/Umrandungsbreite-unten/, "property"],
          [/Umrandungsbreite-links/, "property"],
          [/Umrandungsbreite/, "property"],
          [/Umrandungsstil-oben/, "property"],
          [/Umrandungsstil-rechts/, "property"],
          [/Umrandungsstil-unten/, "property"],
          [/Umrandungsstil-links/, "property"],
          [/Umrandungsstil/, "property"],
          [/Umrandungsfarbe-oben/, "property"],
          [/Umrandungsfarbe-rechts/, "property"],
          [/Umrandungsfarbe-unten/, "property"],
          [/Umrandungsfarbe-links/, "property"],
          [/Umrandungsfarbe/, "property"],
          [/Umrandungsradius/, "property"],
          // vars
          [/(["'])(?:(?=(\\?))\2.)*?\1/, "var"],
          [/^\d+$/, "var"],
          [/(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim, "var"],
          [/Schwarz/, "var"],
          [/Weiß/, "var"],
          [/Blau/, "var"],
          [/Grün/, "var"],
          [/Gelb/, "var"],
          [/Rot/, "var"],
          [/Grau/, "var"],
          [/Hellgrau/, "var"],
          [/Rosa/, "var"],
          [/Pink/, "var"],
          [/Lila/, "var"],
          [/Violett/, "var"],
          [/Orange/, "var"],
          [/nichts/, "var"],
          [/versteckt/, "var"],
          [/gepunktet/, "var"],
          [/gestrichelt/, "var"],
          [/solide/, "var"],
          [/doppelt/, "var"],
          [/gerillt/, "var"],
          [/3d/, "var"],
          [/eingesetzt/, "var"],
          [/draufgelegt/, "var"],
          [/absolut/, "var"],
          [/fest/, "var"],
          [/relativ/, "var"],
          [/fett/, "var"],
          [/normal/, "var"],
          [/unterstrichen/, "var"],
          [/überstrichen/, "var"],
          [/blink/, "var"],
          [/unterstrichen-überstrichen/, "var"],
          [/links/, "var"],
          [/rechts/, "var"],
          [/start/, "var"],
          [/ende/, "var"],
          [/mitte/, "var"],
          // comments
          [/(\/\/.*)/, "comment"],
        ],
      },
    });
    // @ts-ignore
    monaco.editor.defineTheme("incode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "root-kw", foreground: "#05900d", fontStyle: "bold" },
        { token: "sub-kw", foreground: "#8d8e8e", fontStyle: "italic" },
        { token: "comment", foreground: "#575757", fontStyle: "italic" },
        { token: "type", foreground: "#FFA500" },
        { token: "property", foreground: "#0fd3c7" },
        { token: "operator", foreground: "#c61d1d" },
        { token: "event", foreground: "#e5ec1f" },
        { token: "var", foreground: "#27d1d4" },
      ],
    });
  });

  useEffect(() => {
    const i = setInterval(async () => {
      if (Settings.getSetting("autoSave") === true) {
        await ProjectManager.saveProject(Registry.getRegister(0x052));
      }
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <Editor
      height={!props.height ? "100vh" : props.height}
      width={!props.width ? "50%" : props.width}
      language={"incode"}
      className={"incode-monaco-editor"}
      theme={Settings.getSetting("codeEditor.theme")}
      value={code}
      onMount={(editor) => {
        // @ts-ignore^
        window.editor = editor;
        const monaco = Registry.getRegister(0x01) as Monaco;

        if (props.public !== undefined && props.public !== "") {
          if (
            SocketConnection.currentSession.currentData !== editor.getValue()
          ) {
            editor.setValue(SocketConnection.currentSession.currentData);
          }
        }
      }}
      options={{
        fontSize: Settings.getSetting("codeEditor.fontSize"),
        fontFamily: "Fira Code",
        selectOnLineNumbers: true,
        lineNumbers: Settings.getSetting("codeEditor.lineNumbers")
          ? "on"
          : "off",
        automaticLayout: true,
        minimap: {
          enabled: true,
        },
        readOnly: props.readonly,
      }}
      onChange={(newValue, e) => {
        setCode(newValue as string);

        if (Registry.getRegister(0x072) !== true) {
          if (
            props.public !== undefined &&
            props.public !== "" &&
            newValue !== SocketConnection.currentSession.currentData
          ) {
            SocketConnection.submitChange(newValue as string);
          }
        } else {
          Registry.putRegister(0x072, false);
        }
      }}
    />
  );
}

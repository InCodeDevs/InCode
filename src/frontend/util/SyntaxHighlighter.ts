/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { LanguageDefinition } from "../types/LanguageDefinition";

export default class SyntaxHighlighter {
  public static INCODE: LanguageDefinition = {
    patterns: [
      {
        name: "command",
        match: [
          /Erstelle/gi,
          /Setze/gi,
          /Rufe/gi,
          /Füge/gi,
          /Wiederhole/gi,
          /Wenn/gi,
          /Sonst/gi,
          /Warte/gi,
          /Gib/gi,
          /Frage/gi,
        ],
        style: {
          color: "#00ff00",
        },
      },
      {
        name: "operator",
        match: [
          /kleiner/gi,
          /größer/gi,
          /gleich/gi,
          /kleiner-gleich/gi,
          /größer-gleich/gi,
        ],
        style: {
          color: "#ff0000",
        },
      },
      {
        name: "event",
        match: [/gedrückt/gi, /nicht-berührt/gi, /berührt/gi],
        style: {
          color: "#dacb2b",
        },
      },
      {
        name: "type",
        match: [
          /Knopf/gi,
          /Absatz/gi,
          /Textdekoration/gi,
          /Bildschrim/gi,
          /Bild/gi,
          /Überschrift/gi,
          /Eingabefeld/gi,
          /Tabelle/gi,
          /Zeilenumbruch/gi,
          /Zeile/gi,
          /Spalte/gi,
          /Video/gi,
          /Ton/gi,
          /Fentster/gi,
          /Antwort/gi,
          /Konsole/gi,
          /Dialogbox/gi,
          /Wert/gi,
          /Text/gi,
          /Farbe/gi,
          /Methode/gi,
          /Schriftgröße/gi,
          /Schriftart/gi,
          /Schriftstil/gi,
          /Schriftbreite/gi,
          /Quelle/gi,
          /Hintergrundfarbe/gi,
          /Abstand/gi,
          /Abstand-oben/gi,
          /Abstand-rechts/gi,
          /Abstand-unten/gi,
          /Abstand-links/gi,
          /Innerer-Abstand/gi,
          /Innerer-Abstand-oben/gi,
          /Innerer-Abstand-rechts/gi,
          /Innerer-Abstand-unten/gi,
          /Innerer-Abstand-links/gi,
          /Id/gi,
          /Breite/gi,
          /Höhe/gi,
          /Rahmenbreite/gi,
          /Rahmenhöhe/gi,
          /Position/gi,
          /Umrandungsbreite-oben/gi,
          /Umrandungsbreite-rechts/gi,
          /Umrandungsbreite-unten/gi,
          /Umrandungsbreite-links/gi,
          /Umrandungsbreite/gi,
          /Umrandungsstil-oben/gi,
          /Umrandungsstil-rechts/gi,
          /Umrandungsstil-unten/gi,
          /Umrandungsstil-links/gi,
          /Umrandungsstil/gi,
          /Umrandungsfarbe-oben/gi,
          /Umrandungsfarbe-rechts/gi,
          /Umrandungsfarbe-unten/gi,
          /Umrandungsfarbe-links/gi,
          /Umrandungsfarbe/gi,
          /Umrandungsradius/gi,
        ],
        style: {
          color: "#c5852b",
        },
      },
      {
        name: "variable",
        match: [
          /(["'])(?:(?=(\\?))\2.)*?\1/gi,
          /^\d+$/gi,
          /(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim,
          /Schwarz/,
          /Weiß/gi,
          /Blau/gi,
          /Grün/gi,
          /Gelb/gi,
          /Rot/gi,
          /Grau/gi,
          /Hellgrau/gi,
          /Rosa/gi,
          /Pink/gi,
          /Lila/gi,
          /Violett/gi,
          /Orange/gi,
          /nichts/gi,
          /versteckt/gi,
          /gepunktet/gi,
          /gestrichelt/gi,
          /solide/gi,
          /doppelt/gi,
          /gerillt/gi,
          /3d/gi,
          /eingesetzt/gi,
          /draufgelegt/gi,
          /absolut/gi,
          /fest/gi,
          /relativ/gi,
          /fett/gi,
          /normal/gi,
          /unterstreichen/gi,
          /blink/gi,
          /unterstrichen-überstrichen/gi,
          /links/gi,
          /rechts/gi,
          /start/gi,
          /ende/gi,
          /mitte/gi,
          /(\/\/.*)/gi,
        ],
        style: {
          color: "#27d1d4",
        },
      },
      {
        name: "subword",
        match: [
          /den/gi,
          /die/gi,
          /das/gi,
          /der/gi,
          /von/gi,
          /auf/gi,
          /aus/gi,
          /als/gi,
          /mal/gi,
          /solange/gi,
          /ist/gi,
          /wird/gi,
          /und/gi,
          /speicher/gi,
          /in/gi,
          /zum/gi,
          /zu/gi,
          /hinzu/gi,
        ],
        style: {
          color: "#626161",
        },
      },
    ],
  };

  public static highlight(container: HTMLElement, langDef: LanguageDefinition) {
    let text = container.innerText + "\nHL-END";
    let result = "";
    container.innerHTML = "";

    langDef.patterns.push({
      name: "hl-end",
      match: [/HL-END/gi],
    });

    langDef.patterns.forEach((pattern) => {
      pattern.match.forEach((x) => {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = `.${"hl-" + pattern.name} { ${
          pattern.style
            ? Object.entries(pattern.style)
                .map((entry) => entry.join(":"))
                .join(";")
            : ""
        } }`;
        document.getElementsByTagName("head")[0].appendChild(style);

        let match = text.match(x);
        if (match) {
          while (match) {
            match = text.match(x);
            if (match) {
              let matchHTML = match[0];
              let matchIndex = text.indexOf(matchHTML);
              let matchLength = matchHTML.length;
              let beforeHTML = text.substring(0, matchIndex);
              let afterHTML = text.substring(matchIndex + matchLength);
              result += beforeHTML;
              result += `<span class="${
                "hl-" + pattern.name
              }">${matchHTML}</span>`;
              text = afterHTML;
            }
          }
        }
      });
    });

    console.log('<span class="HL-END">HL-END</span>'.length);
    result = result.slice(0, -34);
    container.innerHTML = result;
  }
}

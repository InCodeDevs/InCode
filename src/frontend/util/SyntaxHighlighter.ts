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
        match: [/Erstelle/gi, /Setze/gi],
        style: {
          color: "#00ff00",
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
        style.innerHTML = `.${pattern.name} { ${
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
              result += `<span class="${pattern.name}">${matchHTML}</span>`;
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

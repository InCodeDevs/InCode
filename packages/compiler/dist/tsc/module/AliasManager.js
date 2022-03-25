"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasManager = void 0;
class AliasManager {
    static CMD_ALIASES = [
        ["@", "📜"],
        ["//", "#", "📖"],
        ["create", "erstelle", "definiere", "define", "➕"],
        ["call", "execute", "rufe"],
        ["add", "füge"],
        ["remove", "entferne"],
        ["repeat", "wiederhole", "🔁"],
        ["print", "gib"],
        ["ask", "frage", "❓"],
        ["if", "wenn", "falls"],
        ["else", "sonst"],
        ["wait", "warte", "⌛"],
        ["set", "setze"],
    ];
    static SPECIAL_ALIASES = [["value", "wert"]];
    static TYPE_ALIASES = [
        ["button", "knopf"],
        ["p", "paragraph", "absatz"],
        ["span", "text"],
        ["img", "image", "bild"],
        ["h1", "heading1", "überschrift1"],
        ["h2", "heading2", "überschrift2"],
        ["h3", "heading3", "überschrift3"],
        ["h4", "heading4", "überschrift4"],
        ["h5", "heading5", "überschrift5"],
        ["h6", "heading6", "überschrift6"],
        ["table", "tabelle"],
        ["tr", "row", "zeile"],
        ["tb", "column", "spalte"],
        ["br", "linebreak", "zeilenumbruch"],
        ["video"],
        ["audio", "ton"],
        ["iframe", "frame", "fenster"],
        ["div", "container"],
        ["li", "listitem", "listenpunkt"],
        ["ol", "ordered-list", "geordnete-liste"],
        ["ul", "unordered-list", "ungeordnete-liste"],
        ["a", "link"],
        ["function", "method", "methode", "funktion"],
        ["document.body", "screen", "bildschirm"],
        ["console.log", "console", "konsole"],
        ["alert", "dialogbox"],
        ["key", "taste"],
    ];
    static OPERATOR_ALIASES = [
        ["<", "kleiner", "smaller"],
        [">", "größer"],
        ["===", "gleich", "equals"],
        ["!==", "ungleich", "unequal"],
        [">=", "größergleich", "greaterequal"],
        ["<=", "kelinergleich", "smallerequal"],
    ];
    static EVENT_ALIASES = [
        ["click", "pressed", "gedrückt"],
        ["mouseover", "hovered", "berührt"],
        ["mouseleave", "not-hovered", "nicht-berührt"],
    ];
    static COLOR_PROPERTY_ALIASES = [
        ["style.color", "color", "farbe"],
        ["style.backgroundColor", "backgroundcolor", "hintergrundfarbe"],
        ["blue", "blau"],
        ["lime", "green", "grün"],
        ["red", "rot"],
        ["orange"],
        ["yellow", "gelb"],
        ["white", "weiß"],
        ["black", "schwarz"],
        ["grey", "grau"],
        ["purple", "lila"],
        ["pink", "pink"],
        ["brown", "braun"],
        ["cyan", "cyan"],
        ["magenta", "magenta"],
        ["maroon", "maroon"],
        ["navy", "navy"],
        ["olive", "olive"],
        ["silver", "silber"],
        ["teal", "teal"],
        ["transparent", "transparent"],
    ];
    static getCommandAliases(command) {
        return (AliasManager.CMD_ALIASES.find((alias) => alias.includes(command.toLowerCase())) || []);
    }
    static getTypeAliases(type) {
        return (AliasManager.TYPE_ALIASES.find((alias) => alias.includes(type.toLowerCase())) || []);
    }
    static getOperatorAliases(operator) {
        return (AliasManager.OPERATOR_ALIASES.find((alias) => alias.includes(operator.toLowerCase())) || []);
    }
    static getEventAliases(event) {
        return (AliasManager.EVENT_ALIASES.find((alias) => alias.includes(event.toLowerCase())) || []);
    }
    static getColorPropertyAliases(colorProperty) {
        return (AliasManager.COLOR_PROPERTY_ALIASES.find((alias) => alias.includes(colorProperty.toLowerCase())) || []);
    }
    static getSpecialAliases(special) {
        return (AliasManager.SPECIAL_ALIASES.find((alias) => alias.includes(special.toLowerCase())) || []);
    }
}
exports.AliasManager = AliasManager;
//# sourceMappingURL=AliasManager.js.map
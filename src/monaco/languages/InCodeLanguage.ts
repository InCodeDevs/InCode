/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as monaco from 'monaco-editor'

export class InCodeLanguage {

    /**
     * Registers the InCode Syntax-Highlighting
     */
    public static register() {
        monaco.languages.register({
            id: "incode"
        })

        monaco.languages.setMonarchTokensProvider('incode', {
            ignoreCase: true,
            tokenizer: {
                root: [
                    // root
                    [/Erstelle/, "root-kw"],
                    [/Setze/, "root-kw"],
                    [/Rufe/, "root-kw"],
                    [/Füge/, "root-kw"],
                    [/Wiederhole/, "root-kw"],
                    [/Wenn/, "root-kw"],
                    [/Sonst/, "root-kw"],
                    [/Gib/, "root-kw"],
                    [/Frage/, "root-kw"],
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
                    [/Text/, "type"],
                    [/Bildschirm/, "type"],
                    [/Bild/, "type"],
                    [/Überschrift/, "type"],
                    [/Eingabefeld/, "type"],
                    [/Tabelle/, "type"],
                    [/Zeilenumbruch/, "type"],
                    [/Zeile/, "type"],
                    [/Spalte/, "type"],
                    [/Zeilenumbruch/, "type"],
                    [/Video/, "type"],
                    [/Ton/, "type"],
                    [/Fenster/, "type"],
                    [/Antwort/, "type"],
                    [/Konsole/, "type"],
                    [/Dialogbox/, "type"],
                    [/Wert/, "type"],
                    [/Farbe/, "type"],
                    [/Methode/, "type"],
                    [/Schriftgröße/, "type"],
                    [/Schriftart/, "type"],
                    [/Schriftstil/, "type"],
                    [/Schriftbreite/, "type"],
                    [/Quelle/, "type"],
                    [/Hintergrundfarbe/, "type"],
                    [/Abstand/, "type"],
                    [/Abstand-oben/, "type"],
                    [/Abstand-rechts/, "type"],
                    [/Abstand-unten/, "type"],
                    [/Abstand-links/, "type"],
                    [/Innerer-Abstand/, "type"],
                    [/Innerer-Abstand-oben/, "type"],
                    [/Innerer-Abstand-rechts/, "type"],
                    [/Innerer-Abstand-unten/, "type"],
                    [/Innerer-Abstand-links/, "type"],
                    [/Id/, "type"],
                    [/Breite/, "type"],
                    [/Höhe/, "type"],
                    [/Rahmenbreite/, "type"],
                    [/Rahmenhöhe/, "type"],
                    [/Position/, "type"],
                    [/Umrandungsbreite-oben/, "type"],
                    [/Umrandungsbreite-rechts/, "type"],
                    [/Umrandungsbreite-unten/, "type"],
                    [/Umrandungsbreite-links/, "type"],
                    [/Umrandungsbreite/, "type"],
                    [/Umrandungsstil-oben/, "type"],
                    [/Umrandungsstil-rechts/, "type"],
                    [/Umrandungsstil-unten/, "type"],
                    [/Umrandungsstil-links/, "type"],
                    [/Umrandungsstil/, "type"],
                    [/Umrandungsfarbe-oben/, "type"],
                    [/Umrandungsfarbe-rechts/, "type"],
                    [/Umrandungsfarbe-unten/, "type"],
                    [/Umrandungsfarbe-links/, "type"],
                    [/Umrandungsfarbe/, "type"],
                    [/Umrandungsradius/, "type"],
                    // vars
                    [/(["'])(?:(?=(\\?))\2.)*?\1/, "var"],
                    [/(?<=\s|^)\d+(?=\s|$)/, "var"],
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
                    [/(\/\/.*)/, 'comment']
                ]
            }
        })

        // @ts-ignore
        monaco.editor.defineTheme('incode-lang-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [

                {token: 'root-kw', foreground: '#05900d', fontStyle: 'bold'},
                {token: 'sub-kw', foreground: '#8d8e8e', fontStyle: 'italic'},
                {token: 'comment', foreground: '#575757', fontStyle: 'italic'},
                {token: 'type', foreground: '#FFA500'},
                {token: 'operator', foreground: '#c61d1d'},
                {token: 'event', foreground: '#e5ec1f'},
                {token: 'var', foreground: '#27d1d4'}
            ]
        });

        monaco.languages.registerCompletionItemProvider('incode', {
            // @ts-ignore
            provideCompletionItems: () => {
                const suggestions = [{
                    label: 'simpleText',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'simpleText'
                }, {
                    label: 'testing',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'testing(${1:condition})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                }, {
                    label: 'ifelse',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'if (${1:condition}) {',
                        '\t$0',
                        '} else {',
                        '\t',
                        '}'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'If-Else Statement'
                }];
                return {suggestions: suggestions};
            }
        });
    }

}

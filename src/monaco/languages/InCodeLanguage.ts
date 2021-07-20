/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

import * as monaco from 'monaco-editor'

export class InCodeLanguage {

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
                    [/von/, "sub-kw"],
                    [/auf/, "sub-kw"],
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
                    // operators
                    [/kleiner/, "operator"],
                    [/größer/, "operator"],
                    [/gleich/, "operator"],
                    [/.kleiner-gleich./, "operator"],
                    [/.größer-gleich./, "operator"],
                    // events
                    [/gedrückt/, "event"],
                    [/.berührt./, "event"],
                    [/nicht-berührt/, "event"],
                    // types
                    [/Knopf/, "type"],
                    [/Absatz/, "type"],
                    [/Text/, "type"],
                    [/Bildschirm/, "type"],
                    [/Bild/, "type"],
                    [/Überschrift/, "type"],
                    [/Eingabefeld/, "type"],
                    [/Tabelle/, "type"],
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
                    // vars
                    [/(["'])(?:(?=(\\?))\2.)*?\1/, "var"],
                    [/(?<=\s|^)\d+(?=\s|$)/, "var"],
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

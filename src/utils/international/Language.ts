/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {IObject} from "../interface/IObject";

export class Language {

    public static languages: IObject[] = [
        {
            name: "German",
            codes: ["de-DE", "de-de", "de-De", "de", "german"],
            languageFile: "assets/language/default.json"
        },
        {
            name: "English (US)",
            codes: ["en-US", "en-us", "en-Us", "us", "en", "english"],
            languageFile: "assets/language/en-us.json"
        }
    ]

    public static currentLanguage: IObject = {};

    public static fetchCurrentLanguage() {
        const lang = localStorage.getItem("incode-editor.overwrite.language") || navigator.language;

        let current: IObject = {};

        for (let i = 0; i < Language.languages.length; i++) {
            const l = Language.languages[i];
            l.codes.forEach((code: any) => {
                if (lang === code) {
                    current = l;
                }
            })
        }

        let downloadURL = "assets/language/default.json";

        if (current.languageFile) {
            downloadURL = current.languageFile;
        }

        const x = new XMLHttpRequest();
        x.open("GET", downloadURL, false);
        x.send( null );

        Language.currentLanguage = JSON.parse(x.responseText);
    }

    public static a(b: string): string {
        return Language.currentLanguage[b] || b;
    }

}
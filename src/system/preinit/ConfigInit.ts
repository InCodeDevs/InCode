/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {InCodeInit} from "./InCodeInit";

export class ConfigInit extends InCodeInit {


    init(): void {
        if(localStorage.getItem("incode-editor.theme") === null){
            localStorage.setItem("incode-editor.theme", "dark")
        }

        if(localStorage.getItem("incode-editor.enableAnimations") === null){
            localStorage.setItem("incode-editor.enableAnimations", "true")
        }
    }
}
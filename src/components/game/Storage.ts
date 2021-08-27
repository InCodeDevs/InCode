/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {ObjectDefinition} from "../../Registry";

export class Storage {

    private static config: ObjectDefinition = {};

    public static save() {
        localStorage.setItem("incode-game.config", JSON.stringify(this.config));
        Storage.reload()
    }

    public static reload() {
        Storage.config = JSON.parse(localStorage.getItem("incode-game.config") as string);
    }

    public static set(name: string, value: any){
        Storage.config[name] = value;
        this.save()
    }

    public static get(name: string): any {
        return Storage.config[name];
    }
}
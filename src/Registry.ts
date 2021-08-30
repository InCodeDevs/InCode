/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class Registry {


    // 0x10AA => Project types
    // 0x10AB => Project Code
    // 0x10AD => Project name
    // 0x10AF => Callbacks
    private static options: ObjectDefinition = {};

    public static putRegister(register: number, content: any): void {
        this.options[register] = content;
    }

    public static getRegister(register: number): any {
        return this.options[register];
    }
}

export interface ObjectDefinition {
    [key: string]: any
}

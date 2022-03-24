/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

declare module "@incodelang/compiler/dist/cjs/module/Compiler" {
  export class Compiler {
    static compile(source: string | any[]): string;
  }
}

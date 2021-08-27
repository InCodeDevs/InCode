/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

console.log("HELLO WORLD")

import {PreInit} from "./system/preinit/PreInit";
import {ScreenScaling} from "./system/workers/ScreenScaling";

new PreInit();
new ScreenScaling().run();
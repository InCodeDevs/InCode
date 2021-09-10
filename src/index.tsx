/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import { PreInit } from "./system/preinit/PreInit";
import { ScreenScaling } from "./system/workers/ScreenScaling";
import { Firebase } from "./utils/Firebase";

new PreInit();
new ScreenScaling().run();

new Firebase();

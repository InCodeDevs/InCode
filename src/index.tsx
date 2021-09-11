/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {PreInit} from "./system/preinit/PreInit";
import {ScreenScaling} from "./system/workers/ScreenScaling";
import {User} from "./utils/User";

new PreInit();
new ScreenScaling().run();

User.login("Test", "Test").then(r => {
    if (r) {
        console.log("Success")
    } else {
        User.create("Test", "Test").then(r0 => {
            if (r0) {
                console.log("Created!")
            } else {
                console.log("Could not create")
            }
        })
    }

})
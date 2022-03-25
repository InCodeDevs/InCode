"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const InCodeCommand_1 = require("./InCodeCommand");
class CommentCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        return "// " + args.join(" ");
    }
}
exports.CommentCommand = CommentCommand;
//# sourceMappingURL=CommentCommand.js.map
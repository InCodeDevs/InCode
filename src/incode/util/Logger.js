"use strict";
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    allowDebugs;
    allowWarnings;
    allowErrors;
    logHistory = "";
    logLevelsDisplays = {
        "default": "INFO",
        "warning": "WARN",
        "error": "ERROR"
    };
    setLogStatus(allowLog = true, allowWarnings = true, allowErrors = true) {
        this.allowDebugs = allowLog;
        this.allowWarnings = allowWarnings;
        this.allowErrors = allowErrors;
    }
    log(message, level = "default") {
        this.addToHistory(message, level);
        switch (level) {
            case "default":
                if (this.allowDebugs)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message);
                break;
            case "warning":
                if (this.allowWarnings)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message);
                break;
            case "error":
                if (this.allowErrors)
                    console.log("[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message);
        }
    }
    addToHistory(message, level) {
        this.logHistory += "[" + Logger.getFormattedDate() + "] [" + this.logLevelsDisplays[level] + "] " + message + "\n";
    }
    static getFormattedDate() {
        return new Date().getDate() +
            "." +
            new Date().getMonth() +
            "." +
            new Date().getFullYear() +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map

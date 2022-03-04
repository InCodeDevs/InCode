/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const {
    getFullDataConfig,
    overwriteDataConfig,
} = require("../../module/account_patcher");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
    app.post("/api/v1/admin/data", (req, res) => {
        if (require("../../module/checkAdmin")(req)) {
            const u = getFullDataConfig();
            res.status(200).json({
                error: false,
                message: u,
            });
        } else {
            res.status(403).json({
                error: true,
                message: "Forbidden",
            });
        }
    });
    app.post("/api/v1/admin/data/:data", (req, res) => {
        if (require("../../module/checkAdmin")(req)) {
            const u = getFullDataConfig();
            if (u[req.params.data]) {
                res.status(200).json({
                    error: false,
                    message: u[req.params.data],
                });
            } else {
                res.status(404).json({
                    error: true,
                    message: "Data not found",
                });
            }
        } else {
            res.status(403).json({
                error: true,
                message: "Forbidden",
            });
        }
    });
    app.post("/api/v1/admin/data/store/:data", (req, res) => {
        if (require("../../module/checkAdmin")(req)) {
            if (!req.body.data) {
                res.status(400).json({
                    error: true,
                    message: "No data provided",
                });
                return;
            }
            const u = getFullDataConfig();
            u[req.params.data] = req.body.data;
            overwriteDataConfig(u);
            res.status(200).json({
                error: false,
                message: "Data stored",
            });
        } else {
            res.status(403).json({
                error: true,
                message: "Forbidden",
            });
        }
    });
    app.post("/api/v1/admin/data/:data/allow/:username", (req, res) => {
        if (require("../../module/checkAdmin")(req)) {
            const u = getFullDataConfig();
            if (u[req.params.data]) {
                if (u[req.params.data].allow) {
                    if (u[req.params.data].allow.indexOf(req.params.username) === -1) {
                        u[req.params.data].allow.push(req.params.username);
                        overwriteDataConfig(u);
                        res.status(200).json({
                            error: false,
                            message: "User allowed",
                        });
                    } else {
                        res.status(400).json({
                            error: true,
                            message: "User already allowed",
                        });
                    }
                } else {
                    u[req.params.data].allow = [req.params.username];
                    overwriteDataConfig(u);
                    res.status(200).json({
                        error: false,
                        message: "User allowed",
                    });
                }
            } else {
                res.status(404).json({
                    error: true,
                    message: "Data not found",
                });
            }
        } else {
            res.status(403).json({
                error: true,
                message: "Forbidden",
            });
        }
    });
    app.post("/api/v1/admin/data/:data/disallow/:username", (req, res) => {
        if (require("../../module/checkAdmin")(req)) {
            const u = getFullDataConfig();
            if (u[req.params.data]) {
                if (u[req.params.data].allow) {
                    if (u[req.params.data].allow.indexOf(req.params.username) !== -1) {
                        u[req.params.data].allow.splice(
                            u[req.params.data].allow.indexOf(req.params.username),
                            1
                        );
                        overwriteDataConfig(u);
                        res.status(200).json({
                            error: false,
                            message: "User disallowed",
                        });
                    } else {
                        res.status(400).json({
                            error: true,
                            message: "User not allowed",
                        });
                    }
                } else {
                    res.status(400).json({
                        error: true,
                        message: "User not allowed",
                    });
                }
            } else {
                res.status(404).json({
                    error: true,
                    message: "Data not found",
                });
            }
        } else {
            res.status(403).json({
                error: true,
                message: "Forbidden",
            });
        }
    });
};
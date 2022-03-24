/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { app, BrowserWindow, Menu, MenuItem } from "electron";

import devServe from "./serve";
import { resolve } from "dns/promises";
import * as isOnline from "is-online";

app.on("ready", async () => {
  const options = {
    timeout: 3000,
  };

  if (process.argv.includes("--dev")) {
    options.timeout = 1;
  }

  if (await isOnline(options)) {
    console.log("online");
  } else {
    console.log("offline");
  }

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    fullscreenable: true,
  });
  if (process.argv.includes("--dev")) {
    mainWindow.loadURL("http://localhost:3000/electron-select-app");
  } else {
    mainWindow.loadURL("https://incodelang.de/electron-select-app");
  }
}

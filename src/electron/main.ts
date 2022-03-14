/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { app, BrowserWindow } from "electron";

import devServe from "./serve";

app.on("ready", () => {
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
    height: 600,
    width: 800,
  });

  mainWindow.loadURL("https://incodelang.de/electron-select-app");
}

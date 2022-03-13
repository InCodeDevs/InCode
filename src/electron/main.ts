/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { app, BrowserWindow } from "electron";

import devServe from "./serve";

const port = devServe(() => {
  app.on("ready", () => {
    createWindow(port);

    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow(port);
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

function createWindow(port: number) {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.loadURL("http://localhost:" + port + "/electron-select-app");
}

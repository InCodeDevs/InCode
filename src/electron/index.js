/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const URL = "https://incodelang.de/editor";
// const URL = "http://localhost:3000/editor";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "InCode",
      submenu: [
        {
          label: "Switch Editor",
          click: () => {
            mainWindow.loadFile(path.join(__dirname, "./ui/index.html"));
          },
        },
        {
          label: "Quit",
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.loadFile(path.join(__dirname, "./ui/index.html"));

  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

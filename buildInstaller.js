/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const { MSICreator } = require("electron-wix-msi");
const path = require("path");

const APP_DIR = path.resolve(
  __dirname,
  "./dist-electron/package/incode.editor-win32-x64"
);
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.resolve(__dirname, "./dist-electron/package/installer64");

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,

  // Configure metadata
  description: "Der offizielle InCode Editor",
  exe: "incode.editor",
  name: "InCode Editor",
  manufacturer: "The InCode Developers",
  version: "4.0.0",

  // Configure installer User Interface
  ui: {
    chooseDirectory: true,
  },
});

// 4. Create a .wxs template file
msiCreator.create().then(function () {
  // Step 5: Compile the template to a .msi file
  msiCreator.compile();
});

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

(async () => {
  const electronInstaller = require("electron-winstaller");
  console.log("Hello World");

  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: "./dist-electron/package/incode.editor-win32-x64",
      outputDirectory: "./dist-electron/installer64",
      authors: "The InCode Developers",
      exe: "incode.editor.exe",
    });
    console.log("It worked!");
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})();

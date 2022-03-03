/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const simpleGit = require("simple-git");
const os = require("os");
const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");
const GeneratorStatus = require("../GeneratorStatus");
const { setRateLimit, getUserRateLimit } = require("../generator.desktop");

module.exports = async (username, code, name, job) => {
  setRateLimit(username, getUserRateLimit(username).remaining - 1);

  const p0 = path.join(os.tmpdir(), "incode-" + job.id);

  await simpleGit().clone(
    "https://github.com/InCodeDevs/incode-base-desktop-app.git",
    p0
  );

  GeneratorStatus.updateJobStatus(job.id, "Cloned base desktop app");

  fs.writeFileSync(path.join(p0, ".env"), "APP_NAME=" + name);
  fs.writeFileSync(path.join(p0, "src", "index.html"), code);

  GeneratorStatus.updateJobStatus(job.id, "Generated desktop app");

  childProcess.exec("npm install", { cwd: p0 }, (err) => {
    if (err) {
      console.error(err);
      GeneratorStatus.updateJobStatus(job.id, "Failed");
      GeneratorStatus.updateJobError(job.id, true);
    } else {
      GeneratorStatus.updateJobStatus(job.id, "Installed dependencies");
      childProcess.exec(
        "node patch.js",
        {
          cwd: p0,
        },
        (err) => {
          if (err) {
            console.error(err);
            GeneratorStatus.updateJobStatus(job.id, "Failed");
            GeneratorStatus.updateJobError(job.id, true);
          } else {
            GeneratorStatus.updateJobStatus(job.id, "Patched App");
            childProcess.exec(
              "npm run make",
              {
                cwd: p0,
              },
              (err) => {
                if (err) {
                  console.error(err);
                } else {
                  GeneratorStatus.updateJobStatus(job.id, "Built App");
                  if (
                    !fs.existsSync(path.join(os.tmpdir(), "incode-downloads"))
                  ) {
                    fs.mkdirSync(path.join(os.tmpdir(), "incode-downloads"));
                  }

                  fs.copyFileSync(
                    path.join(
                      p0,
                      "out",
                      "make",
                      "squirrel.windows",
                      "x64",
                      name + "-1.0.0 Setup.exe"
                    ),
                    path.join(
                      os.tmpdir(),
                      "incode-downloads",
                      "incode-" + job.id + "-setup.exe"
                    )
                  );
                  fs.rmSync(path.join(p0), { recursive: true });
                  GeneratorStatus.updateJobStatus(job.id, "Finished");
                  GeneratorStatus.updateJobMessage(
                    job.id,
                    "/api/v1/job/" + job.id + "/download"
                  );
                  GeneratorStatus.updateJobLocalPath(
                    job.id,
                    path.join(
                      os.tmpdir(),
                      "incode-downloads",
                      "incode-" + job.id + "-setup.exe"
                    )
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

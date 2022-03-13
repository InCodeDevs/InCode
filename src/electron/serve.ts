/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as express from "express";
import * as path from "path";

export default function devServe(ready: () => void): number {
  const app = express();

  const port = Math.floor(Math.random() * (16000 - 4000 + 1)) + 4000;

  app.get(
    ["/editor*", "/docs*", "/playground*", "/admin*", "/electron-select-app"],
    (req, res) => {
      res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
    }
  );

  app.get(["*bundle.js.gz", "*bundle.js"], (req, res) => {
    res
      .header("Content-Encoding", "gzip")
      .sendFile(path.join(__dirname, "..", "..", "dist", "bundle.js.gz"));
  });

  app.use(express.static(path.join(__dirname, "..", "..", "dist")));

  app.listen(port, () => {
    console.log(`Dev-Server listening on port ${port}`);
    ready();
  });

  return port;
}

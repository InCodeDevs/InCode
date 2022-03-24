/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const GeneratorStatus = require("../../module/GeneratorStatus");
/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.get("/api/v1/job/:id", (req, res) => {
    const { id } = req.params;
    const job = GeneratorStatus.getJob(id);
    if (job) {
      res.status(200);
      res.json(job);
    } else {
      res.status(404).json({
        error: true,
        message: "Job not found",
      });
    }
  });
  app.get("/api/v1/job/:id/download", (req, res) => {
    const { id } = req.params;
    const job = GeneratorStatus.getJob(id);
    if (job) {
      res.status(200);
      if (job.status === "Finished") {
        res.download(job.localPath);
      } else {
        res.status(500).json({
          error: true,
          message: "Job not finished",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "Job not found",
      });
    }
  });
};

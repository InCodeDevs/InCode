/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */
const { v4 } = require("uuid");

class GeneratorStatus {
  static JOBS = [];

  static newJob() {
    const job = {
      id: v4(),
      status: "job_created",
      message: "",
      error: false,
      localPath: "",
    };
    GeneratorStatus.JOBS.push(job);
    return job;
  }

  static updateJob(id, job) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        this.JOBS[i] = job;
        return;
      }
    }
  }

  static updateJobStatus(id, status) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        this.JOBS[i].status = status;
        return;
      }
    }
  }

  static updateJobMessage(id, message) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        this.JOBS[i].message = message;
        return;
      }
    }
  }

  static updateJobError(id, error) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        this.JOBS[i].error = error;
        return;
      }
    }
  }

  static updateJobLocalPath(id, localPath) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        this.JOBS[i].localPath = localPath;
        return;
      }
    }
  }

  static getJob(id) {
    for (let i = 0; i < this.JOBS.length; i++) {
      if (this.JOBS[i].id === id) {
        return this.JOBS[i];
      }
    }
  }
}

module.exports = GeneratorStatus;

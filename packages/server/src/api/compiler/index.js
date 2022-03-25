/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");
const template = require("../../module/template");
const path = require("path");
const { Compiler, AbstractSyntaxTreeGenerator } = require(path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "compiler"
));

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/compiler/compiled", (req, res) => {
    const body = req.body;
    if (body.code) {
      res.status(200);
      res.end(Compiler.compile(body.code));
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Invalid Request Body",
        })
      );
    }
  });

  app.post("/api/v1/compiler/compiled/ast", (req, res) => {
    const body = req.body;
    if (body.ast) {
      res.status(200);
      res.end(AbstractSyntaxTreeGenerator.generate(body.ast));
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Invalid Request Body",
        })
      );
    }
  });

  app.post("/api/v1/compiler/generated/ast", (req, res) => {
    const body = req.body;
    if (body.code) {
      res.status(200);
      res.end(JSON.stringify(AbstractSyntaxTreeGenerator.generate(body.code)));
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Invalid Request Body",
        })
      );
    }
  });

  app.get("/api/v1/compiler/view", (req, res) => {
    if (req.query.code) {
      res.status(200);
      res.end(
        "<body></body><script>" +
          Compiler.compile(decodeURIComponent(req.query.code)) +
          "</script>"
      );
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Invalid Request Body",
        })
      );
    }
  });
  app.post("/api/v1/compiler/view", (req, res) => {
    if (req.body.code) {
      res.status(200);
      res.end(
        "<body></body><script>" +
          Compiler.compile(decodeURIComponent(req.body.code)) +
          "</script>"
      );
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Invalid Request Body",
        })
      );
    }
  });
};

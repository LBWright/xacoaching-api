"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedRouter = exports.publicRouter = void 0;

const publicRouter = app => {
  app.use('/api', (req, res) => res.send('Hello World'));
};

exports.publicRouter = publicRouter;

const protectedRouter = app => {};

exports.protectedRouter = protectedRouter;
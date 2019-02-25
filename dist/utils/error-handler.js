"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusHandler = void 0;

const statusHandler = (err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  switch (err.statusCode) {
    case 400:
      res.status(400).json({
        error: err.message
      });
      break;

    case 401:
      res.status(401).json({
        error: err.message
      });
      break;

    case 403:
      res.status(403).json({
        error: err.message
      });
      break;

    case 404:
      res.status(404).json({
        error: err.message
      });
      break;

    case 500:
      res.status(500).json({
        error: err.message
      });
      break;

    default:
      res.status(500).json({
        error: err.message
      });
  }
};

exports.statusHandler = statusHandler;
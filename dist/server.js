"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config"));

var _db = require("./utils/db");

var _router = require("./resources/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // privateRouter(app)

(0, _router.publicRouter)(app);

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config.default.port, () => {
      console.log('-------------------------');
      console.log(`Server running on ${_config.default.port}`);
      console.log('-------------------------');
    });
  } catch (err) {
    console.error(err);
  }
};

exports.start = start;
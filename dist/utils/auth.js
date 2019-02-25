"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.login = exports.register = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _user = require("../resources/user/user.model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

exports.verifyToken = verifyToken;

const register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = new Error('Email and password required');
    err.statusCode = 400;
    next(err);
  }

  try {
    // Right now, what we have is okay, but we need to do a check
    // to see if the user already exists and throw appropriate status code
    const user = await _user.User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({
      token
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.register = register;

const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    let err = new Error('A valid email and password are required');
    err.statusCode = 400;
    next(err);
  }

  const invalid = 'Invalid email and password combination';

  try {
    const user = await _user.User.findOne({
      email: req.body.email
    }).select('email password').exec();

    if (!user) {
      let err = new Error(invalid);
      err.statusCode = 401;
      throw err;
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      let err = new Error(invalid);
      err.statusCode = 401;
      throw err;
    }

    const token = newToken(user);
    return res.status(201).send({
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.login = login;

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    let err = new Error('Invalid token');
    err.statusCode = 401;
    next(err);
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    let err = new Error('Token not authorized');
    err.statusCode = 401;
    next(err);
  }

  const user = await _user.User.findById(payload.id).select('-password').lean().exec();

  if (!user) {
    let err = new Error('User not authorized');
    err.statusCode = 401;
    next(err);
  }

  req.user = user;
  next();
};

exports.protect = protect;
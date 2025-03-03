const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/updateSql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ExpressError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
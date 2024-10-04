const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/updateSql");

class Firm {}

module.exports = Firm;

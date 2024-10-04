const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/updateSql");

class Services {
  static async getService() {}
}

module.exports = Services;
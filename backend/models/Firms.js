const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/updateSql");

class Firm {
  // Get a list of firms by state and county
  static async getFirms({ data }) {
    const res = await db.query(
      `SELECT * FROM firms WHERE state_id = $1 AND county_id = $2`,
      [data.stateId, data.countyId]
    );
    const firms = res.rows;
    return firms;
  }

  // Get a certain firm by id
  static async getFirm({ id }) {
    const res = await db.query(`SELECT * FROM firms WHERE id=$1`, [id]);
    const firm = res.rows;
    return firm;
  }

  // Add a firm
  static async addFirm({ data }) {}

  // Remove a firm
  static async removeFirm({ id }) {}

  //Update a firm
  static async updateFirm({ data }) {}
}

module.exports = Firm;

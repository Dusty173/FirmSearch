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
  static async addFirm({ data }) {
    const duplicateCheck = await db.query(
      `SELECT name, county_id FROM firms 
      WHERE name = $1 AND county_id = $2`,
      [data.name, data.countyId]
    );

    if (duplicateCheck.rows) {
      return BadRequestError("This Firm already exists in this county.");
    }

    const res = await db.query(
      `INSERT INTO firms 
      (name, established, contact, aumrecord, RIA, service_id, county_id, state_id) 
      VALUES ($1, $2, $3, $4, $5, $6, 7$, $8)`[
        (data.name,
        data.established,
        data.contact,
        data.aumrecord,
        data.RIA,
        data.serviceId,
        data.countyId,
        data.stateId)
      ]
    );
  }

  // Remove a firm
  static async removeFirm({ id }) {
    const res = await db.query(`DELETE FROM firms WHERE id = $1`, [id]);
    const deleted = res.rows;
    return deleted;
  }

  //Update a firm
  static async updateFirm({ data }) {}
}

module.exports = Firm;

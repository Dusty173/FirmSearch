const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Counties {
  // List all counties by state_id (All counties for a state)
  static async getCounties(stateId) {
    const res = await db.query(
      `SELECT id, name, state_id FROM counties WHERE state_id = $1`,
      [stateId]
    );

    const counties = res.rows[0];
    return counties;
  }

  // Get a specific county by its name
  static async getCounty(name) {
    const res = await db.query(
      `SELECT id, name, state_id FROM counties WHERE name = $1`,
      [name]
    );
    const county = res.rows[0];
    return county;
  }

  // Add a county to a state
  static async addCounty({ data }) {
    const res = await db.query(
      `INSERT INTO counties (name, state_id) VALUES ($1, $2)`,
      [data.name, data.stateId]
    );

    let county = res.rows[0];
    return county;
  }

  //Remove a county
  static async removeCounty(name, stateId) {
    const res = await db.query(
      `DELETE FROM counties WHERE name = $1 AND state_id = $2`,
      [name, stateId]
    );
  }
}

module.exports = Counties;

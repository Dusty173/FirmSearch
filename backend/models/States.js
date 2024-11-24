const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/updateSql");

class States {
  // Get a list of all states
  static async getStates() {
    const res = await db.query(`SELECT id, name FROM states`);

    const states = res.rows[0];
    return states;
  }

  // Get a specific state
  static async getState(name) {
    const res = await db.query(`SELECT id, name FROM states WHERE name = $1`, [
      name,
    ]);

    const state = res.rows[0];
    return state;
  }
}

module.exports = States;

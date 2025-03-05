const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/updateSql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ExpressError,
} = require("../expressError.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Page {
  // GET request for text on About page,
  // stored in db so that it is editable without bringing service down.
  static async getAboutInfo() {
    const result = await db.query(
      `SELECT email, aboutinfo, contact FROM pagedata`
    );

    return result.rows;
  }

  // GET request for text on home page,
  // stored in db so that it is editable without bringing service down.
  static async getHomeInfo() {
    const result = await db.query(`SELECT homepgtxt FROM pagedata`);
    return result.rows[0];
  }

  // UPDATE method for updating mission statement
  static async updateHomeInfo(data) {
    const { homepgtxt } = data;
    const updated = db.query(`UPDATE pagedata SET homepgtxt VALUES $1`, [
      homepgtxt,
    ]);
    updated = res.rows[0];

    if (!updated) throw new BadRequestError(`Unable to update about page`);

    return updated;
  }

  // UPDATE method for updating about us page
  static async updateAboutInfo(data) {
    const { aboutinfo, email, contact } = data;
    const updated = db.query(
      `UPDATE pagedata SET aboutinfo, email, contact VALUES $1, $2, $3`,
      [aboutinfo, email, contact]
    );
    updated = res.rows[0];

    if (!updated) throw new BadRequestError(`Unable to update about page`);

    return updated;
  }
}

module.exports = Page;

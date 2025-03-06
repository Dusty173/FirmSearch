const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/updateSql.js");
const { BadRequestError } = require("../expressError.js");

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

    if (homepgtxt.length < 20)
      throw new BadRequestError(
        "Mission Statement MUST be more than 20 characters."
      );

    const updated = db.query(`UPDATE pagedata SET homepgtxt = $1`, [homepgtxt]);

    if (!updated) throw new BadRequestError(`Unable to update about page`);

    return updated;
  }

  // UPDATE method for updating about us page
  static async updateAboutInfo(data) {
    const { aboutinfo, email, contact } = data;

    if (aboutinfo.length < 1)
      throw new BadRequestError("About info cannot be empty");

    if (contact.length < 1)
      throw new BadRequestError("Contact info cannot be empty");

    if (!email.includes("@"))
      throw new BadRequestError("Email format not accepted. Must contain @");

    const updated = db.query(
      `UPDATE pagedata SET aboutinfo = $1, email = $2, contact = $3`,
      [aboutinfo, email, contact]
    );
    if (!updated) throw new BadRequestError(`Unable to update about page`);

    return updated;
  }
}

module.exports = Page;

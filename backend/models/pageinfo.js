const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/updateSql.js");
const { BadRequestError } = require("../expressError.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { BADFAMILY } = require("dns");

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

    const updated = await db.query(`UPDATE pagedata SET homepgtxt = $1`, [
      homepgtxt,
    ]);

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

    const updated = await db.query(
      `UPDATE pagedata SET aboutinfo = $1, email = $2, contact = $3`,
      [aboutinfo, email, contact]
    );
    if (!updated) throw new BadRequestError(`Unable to update about page`);

    return updated;
  }

  // Resource page models --------------------------------------------

  static async getAllResources() {
    const result = await db.query(
      `SELECT id, author_id, created_at, textdata, link FROM resourcepage ORDER BY created_at DESC`
    );

    return result.rows;
  }

  static async selectResource(id) {
    const result = await db.query(
      `SELECT id, author_id, created_at, textdata, link FROM resourcepage WHERE id = $1`,
      [id]
    );

    if (!result)
      throw new BadRequestError(`Unable to retrieve post with ID ${id}`);

    return result;
  }

  static async addResource(data) {
    const { authId, textdata, link } = data;

    if (!authId) throw new BadRequestError("No Author ID found.");

    if (textdata.length < 1) throw new BadRequestError("Body too short.");

    if (link < 1) throw new BadRequestError("Link not long enough.");

    const insert = await db.query(
      `INSERT INTO resourcepage (author_id, created_at, textdata, link) VALUES ($1, $2, $3, $4)`,
      [authId, new Date(), textdata, link]
    );

    if (!insert) throw new BadRequestError("Resource addition failed.");

    return insert;
  }

  static async removeResource(data) {
    const { authId, postId } = data;

    if (!authId) throw new BadRequestError("No Author ID found.");

    if (!postId) throw new BadRequestError("No Post ID found.");

    const deleted = await db.query(
      `DELETE FROM resourcepage WHERE id = $1 AND author_id = $2`,
      [postId, authId]
    );

    if (!deleted) throw new BadRequestError("Delete failed");

    return deleted;
  }

  // Review page models ----------------------------------------------------

  static async getAllReviews() {
    const result = await db.query(
      `SELECT id, author_id, created_at, title, textdata, link FROM reviewpage ORDER BY created_at DESC`
    );

    return result.rows;
  }

  static async getReview(id) {
    const result = await db.query(
      `SELECT id, author_id, created_at, title, textdata, link FROM reviewpage WHERE id = $1`,
      [id]
    );

    if (!result)
      throw new BadRequestError(`Unable to retrieve Review with ID ${id}`);

    return result.rows[0];
  }

  static async addReview(data) {
    const { authId, title, textdata, link } = data;

    if (!authId) throw new BadRequestError("No Author ID, cannot add.");
    if (title.length < 2) throw new BadRequestError("Title too short.");
    if (textdata.length < 1) throw new BadRequestError("Body too short.");
    if (link.length < 1) throw new BadRequestError("Link too short.");

    const add = await db.query(
      `INSERT INTO reviewpage (author_id, created_at, title, textdata, link) VALUES ($1, $2, $3, $4, $5)`,
      [authId, new Date(), title, textdata, link]
    );

    if (!add) throw new BadRequestError("Review addition failed.");

    return add;
  }

  static async removeReview(data) {
    const { authId, reviewId } = data;

    if (!authId) throw new BadRequestError("No Author ID");
    if (!reviewId) throw new BadRequestError("No Review ID");

    const deleted = await db.query(
      `DELETE FROM reviewpage WHERE id = $1 AND author_id = $2`,
      [reviewId, authId]
    );

    if (!deleted) throw new BadRequestError("Failed to delete Review");

    return deleted;
  }
}

module.exports = Page;

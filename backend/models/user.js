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

class User {
  // auth/registering user models ------------------------

  static async authenticate(username, password) {
    const res = await db.query(
      `SELECT username, hashed_pw, is_admin FROM users WHERE username = $1`,
      [username]
    );
    const user = res.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.hashed_pw);
      if (isValid === true) {
        delete user.hashed_pw;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username or password");
  }

  static async register({
    username,
    password,
    email,
    firstname,
    lastname,
    is_admin,
  }) {
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Username ${username} already exists.`);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const res = await db.query(
      `INSERT INTO users (username, hashed_pw, email, created_at, firstname, lastname, is_admin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, email, is_admin, created_at`,
      [
        username,
        hashedPassword,
        email,
        new Date(),
        firstname,
        lastname,
        is_admin,
      ]
    );

    const user = res.rows[0];

    return user;
  }

  // User models ---------------------------------

  static async findAll() {
    const result = await db.query(
      `SELECT username, email, firstname, lastname, is_admin
           FROM users
           ORDER BY username`
    );

    return result.rows;
  }

  static async get(username) {
    const userRes = await db.query(
      `SELECT id, username, email, firstname, lastname, is_admin
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  static async updateUser(username, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      username: "username",
      email: "email",
    });
    const usernameIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users SET ${setCols} WHERE username = ${usernameIdx}
    RETURNING username, email`;

    const res = await db.query(querySql, [...values, username]);

    const user = res.rows[0];

    if (!user)
      throw new NotFoundError(`Unable to update profile ${username} 
        because it does not exist`);

    delete user.hashed_pw;

    return user;
  }

  static async removeUser(username) {
    let res = await db.query(
      `DELETE FROM users WHERE username = $1 RETURNING username`,
      [username]
    );
    const user = res.rows[0];

    if (!user) throw new NotFoundError(`Username ${username} does not exist`);
  }

  // models for saved firms ----------------------------

  static async getFirmsByUser(userId) {
    let res = await db.query(
      `SELECT firmname, firmcrd FROM savedfirms WHERE user_id = $1`,
      [userId]
    );

    let saved = res.rows[0];
    if (!saved) throw new NotFoundError("You have no saved firms!");

    return saved;
  }

  static async saveFirm(data) {
    const { userId, firmCrd, firmName } = data;

    let res = await db.query(
      `INSERT INTO savedfirms (user_id, firmcrd, firmname) VALUES ($1, $2, $3) RETURNING user_id, firmcrd, firmname`,
      [userId, firmCrd, firmName]
    );
    return res.rows;
  }

  static async removeFirm(data) {
    const { firmCrd, userId } = data;

    let res = await db.query(
      `DELETE FROM savedfirms WHERE user_id = $1 AND firmcrd = $2`,
      [userId, firmCrd]
    );
    return res.deleted;
  }
}

module.exports = User;

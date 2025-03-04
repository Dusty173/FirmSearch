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
  static async authenticate(username, password) {
    const res = await db.query(
      `SELECT username, hashed_pw FROM users WHERE username = $1`,
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

  static async register({ username, password, email, firstname, lastname }) {
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Username ${username} already exists.`);

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const res = await db.query(
      `INSERT INTO users (username, hashed_pw, email, created_at, firstname, lastname) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, email, created_at`,
      [username, hashedPassword, email, new Date(), firstname, lastname]
    );

    const user = res.rows[0];

    return user;
  }

  static async findAll() {
    const result = await db.query(
      `SELECT username, email, firstname, lastname,
           FROM users
           ORDER BY username`
    );

    return result.rows;
  }

  static async get(username) {
    const userRes = await db.query(
      `SELECT id, username, email, firstname, lastname
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
}

module.exports = User;
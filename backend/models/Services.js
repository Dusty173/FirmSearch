const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/updateSql");

class Services {
  // Get a list of services
  static async getServices() {
    const res = db.query(`SELECT servicename, servicedesc FROM services`);

    const services = res.rows[0];
    return services;
  }

  // Get info on specific service
  static async getService(id) {
    const res = await db.query(
      `SELECT servicename, servicedesc FROM services WHERE id = $1`,
      [id]
    );
    const service = res.rows[0];
    return service;
  }

  // Add a service
  static async addService({ data }) {
    const duplicateCheck = await db.query(
      "SELECT servicename FROM services WHERE servicename = $1;",
      [data.serviceName]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("This service already exists");
    }

    const res = await db.query(
      `INSERT INTO services (servicename, servicedesc) VALUES ($1, $2)`,
      [data.serviceName, data.serviceDesc]
    );

    const service = res.rows[0];
    return service;
  }

  // Remove a service
  static async removeService({ data }) {
    const res = await db.query(
      `DELETE FROM services WHERE id = $1 AND servicename = $2`,
      [data.id, data.serviceName]
    );

    const deleted = res.rows[0];
    return deleted;
  }
}

module.exports = Services;

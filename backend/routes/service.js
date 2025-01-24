const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { default: test } = require("node:test");
const Services = require("../models/Services");
const addServiceSchema = require("../schemas/addServiceSchema.json");

// GET route for retrieving a list of services
router.get("/", async (req, res, next) => {
  try {
    const services = await Services.getServices();
    return res.json({ services });
  } catch (err) {
    return next(err);
  }
});

// GET route for inspecting a service
router.get("/:id", async (req, res, next) => {
  try {
    const service = await Services.getService(id);
    return res.json({ service });
  } catch (err) {
    return next(err);
  }
});

// POST route for adding a service, ADMIN ONLY
router.post("/addservice", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addServiceSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.message);
      throw new BadRequestError(errs);
    }

    const newService = await Services.addService(req.body);
    return res.json(newService);
  } catch (err) {
    return next(err);
  }
});

// DELETE route for removing a service
router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    await Services.removeService(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

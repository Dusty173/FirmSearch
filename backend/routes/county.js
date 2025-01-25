"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { default: test } = require("node:test");
const Counties = require("../models/Counties");
const addCountySchema = require("../schemas/addCountySchema.json");

// GET route for getting all counties
router.get("/:stateId/counties", async (req, res, next) => {
  try {
    const counties = await Counties.getCounties();
    return res.json({ counties });
  } catch (err) {
    return next(err);
  }
});

// GET route for a specific county
router.get("/:name", async (req, res, next) => {
  try {
    const county = await Counties.getCounty(req.params.name);
    return res.json({ county });
  } catch (err) {
    return next(err);
  }
});

// POST route for adding a new county
router.post("/add-county", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addCountySchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.message);
      throw new BadRequestError(errs);
    }
  } catch (err) {
    return next(err);
  }
});

// DELETE route for removing any counties
router.delete("/:name/:stateId", ensureAdmin, async (req, res, next) => {
  try {
    await Counties.removeCounty(req.params.name, req.params.stateId);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;

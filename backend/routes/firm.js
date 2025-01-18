const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const addFirmSchema = require("../schemas/addFirmSchema.json");
const { ensureAdmin } = require("../middleware/auth");
const Firm = require("../models/Firms");
const { BadRequestError } = require("../expressError");
const { default: test } = require("node:test");

// GET route for retrieving a list of all related firms
// in search terms by state and county.
router.get("/:stateId/:countyId", async (req, res, next) => {
  try {
    const firms = await Firm.getFirms(req.params.stateId, req.params.countyId);
    return res.json({ firms });
  } catch (err) {
    return next(err);
  }
});

// GET route for retrieving data on a single firm.
router.get("/:id", async (req, res, next) => {
  try {
    const firm = await Firm.getFirm(req.params.id);
    return res.json({ firm });
  } catch (err) {
    return next(err);
  }
});

// POST route for adding firms, this route is only available to administrators as
// random users will not be able to add firms.
router.post("/add", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, addFirmSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.message);
      throw new BadRequestError(errs);
    }

    const newFirm = await Firm.addFirm(req.body);
    return res.json(newFirm);
  } catch (err) {
    return next(err);
  }
});

// DELETE route for deleting a firm, only accessible by administrators.
router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const deleted = await Firm.removeFirm(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

// PATCH route for updating a firm, admin access only.
router.patch("/:id", ensureAdmin, async (req, res, next) => {});

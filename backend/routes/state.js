"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { default: test } = require("node:test");
const States = require("../models/States");

// GET route for getting all states

router.get("/states", async (req, res, next) => {
  try {
    const states = await States.getStates();
    return res.json({ states });
  } catch (err) {
    return next(err);
  }
});

// GET route for a specific state <--- Unsure if will be needed, but good to have
router.get("/:name", async (req, res, next) => {
  try {
    const state = await States.getState(req.params.name);
    return res.json({ state });
  } catch (err) {
    return next(err);
  }
});

// Adding or Removing a U.S. State is probably not necessary, but if it does happen
// we'll worry about this then. For now the DATABASE will be preloaded with all 50 states

module.exports = router;

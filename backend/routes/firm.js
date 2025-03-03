"use strict";
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
router.get();

module.exports = router;

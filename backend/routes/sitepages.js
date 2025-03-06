"use strict";
const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const Page = require("../models/pageinfo");
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError, ExpressError } = require("../expressError");
const { default: test } = require("node:test");
const updateAboutSchema = require("../schemas/updateAboutSchema.json");

// ----------- Homepage -----------

// Route for getting homepage data for mission statement.
router.get("/", async (req, res, next) => {
  try {
    const home = await Page.getHomeInfo();
    return res.json({ home });
  } catch (err) {
    return next(err);
  }
});

// Route for updating hompage data, Admin only.
router.patch("/updhome", ensureAdmin, async (req, res, next) => {
  try {
    const home = await Page.updateHomeInfo(req.body);
    return res.status(201).json({ home });
  } catch (err) {
    return next(err);
  }
});

// ----------- About page -----------

// Route for getting information to about page, accessible by all who click on About Us
router.get("/aboutus", async (req, res, next) => {
  try {
    const about = await Page.getAboutInfo();
    return res.json({ about });
  } catch (err) {
    return next(err);
  }
});

// Route for updating About Us data, Admin only.
router.patch("/updabout", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, updateAboutSchema);
    if (!validator.valid) {
      const err = validator.errors.map((e) => e.message);
      throw new BadRequestError(err);
    }

    const about = await Page.updateAboutInfo(req.body);
    return res.status(201).json({ about });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

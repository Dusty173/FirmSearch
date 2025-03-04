"use strict";
const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const Page = require("../models/pageinfo");
const { ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { default: test } = require("node:test");

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
    const home = await Page.updateHomeinfo(data);
    return res.json({ home });
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

module.exports = router;

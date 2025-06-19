"use strict";
const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const Page = require("../models/pageinfo");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError, ExpressError } = require("../expressError");
const { default: test } = require("node:test");
const updateAboutSchema = require("../schemas/updateAboutSchema.json");
const addResourceSchema = require("../schemas/addResourceSchema.json");
const { resolveMx } = require("dns");

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

// ----------- Resource page -----------

// Route for adding a resource to the page
router.post(
  "/add-resource",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const validator = jsonschema.validate(req.body, addResourceSchema);
      if (!validator.valid) {
        const err = validator.errors.map((e) => e.message);
        throw new BadRequestError(err);
      }

      const added = Page.addResource(req.body);
      return res.status(201).json({ added });
    } catch (err) {
      return next(err);
    }
  }
);

// Route for getting all resources
router.get("/resources", async (req, res, next) => {
  try {
    const resources = await Page.getAllResources();
    return res.json({ resources });
  } catch (err) {
    return next(err);
  }
});

// Route for deleting a resource from the page
router.delete(
  "/remove-resource",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const deleted = await Page.removeResource(req.body);
      return res.json({ deleted });
    } catch (err) {
      return next(err);
    }
  }
);
// Route for getting a certain resource

router.get("/resource/:id", async (req, res, next) => {
  try {
    const resource = await Page.selectResourc(req.body);
    return res.json({ resource });
  } catch (err) {
    return next(err);
  }
});

// ----------- Review page -----------

// Route for adding a review
router.post(
  "/add-reviews",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const review = await Page.addReview(req.body);
      return res.json({ review });
    } catch (err) {
      return next(err);
    }
  }
);

// Route for getting all reviews
router.get("/reviews", async (req, res, next) => {
  try {
    const reviews = await Page.getAllReviews();
    return res.json({ reviews });
  } catch (err) {
    return next(err);
  }
});

// Route for getting a certain review
router.get("/reviews/:id", async (req, res, next) => {
  try {
    const review = await Page.getReview(req.body);
    return res.json({ review });
  } catch (err) {
    return next(err);
  }
});

// Route for deleting a review
router.delete(
  "/remove-review",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const deleteReview = await Page.removeReview(req.body);
      return res.json({ deleteReview });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;

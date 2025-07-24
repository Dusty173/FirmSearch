"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/auth");
const User = require("../models/user");
const { createToken } = require("../helpers/token");
const userRegister = require("../schemas/userRegister.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const addFirmSchema = require("../schemas/addFirmSchema.json");
const router = express.Router();
// Route for getting user for auth

router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

// Admin POST route for adding Users.

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegister);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.message);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

// Admin GET route for retrieving a list of all Users

router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

// User/Admin route to Edit a User

router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.message);
      throw new BadRequestError(errs);
    }

    const user = await User.updateUser(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

// User/Admin route for removing a User

router.delete(
  "/:username",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.removeUser(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;

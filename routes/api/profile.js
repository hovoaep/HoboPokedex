const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/like/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const pokemonId = req.params.pokemonId;
    console.log(pokemonId);

    Profile.findOne({ user: req.user.id }).then(user => {
      user.likes.push(pokemonId);
      user.save().then(data => res.json(data));
    });
  }
);

router.delete(
  "/like/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const pokemonId = req.params.pokemonId;
    console.log(pokemonId);

    Profile.findOne({ user: req.user.id })
      .then(user => {
        const removeIndex = user.likes.indexOf(pokemonId);
        user.likes.splice(removeIndex, 1);
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

router.post(
  "/compare/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const pokemonId = req.params.pokemonId;
    Profile.findOne({ user: req.user.id })
      .then(user => {
        user.compare.push(pokemonId);
        user.save().then(user => res.json(user));
      })
      .catch(err => console.log(err));
  }
);

router.delete(
  "/compare/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const pokemonId = req.params.pokemonId;
    Profile.findOne({ user: req.user.id }).then(user => {
      const removeIndex = user.compare.indexOf(pokemonId);
      user.compare.splice(removeIndex, 1);
      user.save().then(user => res.json(user));
    });
  }
);

module.exports = router;

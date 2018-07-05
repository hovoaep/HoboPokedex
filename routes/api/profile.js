const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation

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
  "/like/:id/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.id;
    const pokemonId = req.params.pokemonId;
    Profile.findById({ _id: userId }).then(user => {
      user.likes.push(pokemonId);
      user.save();
      const payload = {
        id: user.id,
        name: user.name,
        likes: user.likes
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          // success: true,
          token: "Bearer " + token
        });
      });
      // res.json(user.likes);
    });
  }
);

router.delete(
  "/like/:id/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.id;
    const pokemonId = req.params.pokemonId;
    Profile.findById({ _id: userId })
      .then(user => {
        // Get remove index
        const removeIndex = user.likes.indexOf(pokemonId);

        // Splice comment out of array
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
    const { pokemonId } = req.params;
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(data => {
        if (!data) {
          new Profile({ user: req.user.id, compare: pokemonId })
            .save()
            .then(profile => res.json(profile));
        } else {
          let compareData = data.compare;
          compareData.push(pokemonId);
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { compare: compareData },
            { new: true }
          ).then(profile => res.json(profile));
        }
      })
      .catch(err => console.log(err));
  }
);

router.delete(
  "/compare/:id/:pokemonId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, pokemonId } = req.params;
    Profile.findById({ _id: id }).then(user => {
      let checkValid = user.compare.filter(item => item === pokemonId);
      let index = user.compare.indexOf(pokemonId);
      if (checkValid.length) {
        user.compare.splice(index, 1);
        user.save().then(data => res.status(200).json(data.compare));
      } else {
        return res
          .status(400)
          .json(
            "Sorry you don't have this pokemon in your compare and can't uncompare this"
          );
      }
    });
  }
);

module.exports = router;

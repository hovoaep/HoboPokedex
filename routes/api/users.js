const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const email = require("../../email/email");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/verify/:activeToken", (req, res) => {
  User.findOne({ activeToken: req.params.activeToken })
    .then(user => {
      user.active = true;
      user.activeToken = "";
      user
        .save()
        .then(verifaydUser => res.status(200).json("Now you can login in :)"))
        .catch(err => {
          res.status(400).json("Somthing go wroing", err);
        });
    })
    .catch(err => res.status(400).json("User not found"));
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.active = false;
          newUser.activeToken = randomstring.generate();
          newUser.password = hash;
          newUser.save().then(user => {
            res.status(200).json("Now you need a verify your account");
            console.log(user);
            let html = `
                <h3>Hello and welcome to hoboshop</h3>
                <h5>Thank your for register, one more step and you can go to shop somthing, you need a verifay you<h5/>
                <h6>For verfay pleas click this link</h6>
                <a href="http://localhost:5000/api/users/verify/${
                  user.activeToken
                }">Verify accaount</a>
              `;
            email
              .sendEmail(
                "admin@hoboshop.com",
                "hovoaep@gmail.com",
                "Plesa verifay",
                html
              )
              .then(res => console.log(res))
              .catch(err => console.log(err));
          });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    if (!user.active) {
      return res
        .status(400)
        .json("First you need verify your account, link sent in your email");
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        const payload = {
          id: user.id,
          name: user.name,
          likes: user.likes,
          compare: user.compare
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post(
  "/xxx",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      likes: req.user.likes,
      compare: req.user.compare,
      active: req.user.active
    });
  }
);

// router.post(
//   "/like/:id/:pokemonId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const userId = req.params.id;
//     const pokemonId = req.params.pokemonId;
//     User.findById({ _id: userId }).then(user => {
//       user.likes.push(pokemonId);
//       user.save();
//       const payload = {
//         id: user.id,
//         name: user.name,
//         likes: user.likes
//       };
//       jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
//         res.json({
//           // success: true,
//           token: "Bearer " + token
//         });
//       });
//       // res.json(user.likes);
//     });
//   }
// );

// router.delete(
//   "/like/:id/:pokemonId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const userId = req.params.id;
//     const pokemonId = req.params.pokemonId;
//     User.findById({ _id: userId })
//       .then(user => {
//         // Get remove index
//         const removeIndex = user.likes.indexOf(pokemonId);

//         // Splice comment out of array
//         user.likes.splice(removeIndex, 1);

//         user.save().then(user => res.json(user));
//       })
//       .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//   }
// );

// router.post(
//   "/compare/:id/:pokemonId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { id, pokemonId } = req.params;
//     User.findById({ _id: id }).then(user => {
//       let checkValid = user.compare.filter(item => item === pokemonId);
//       // if (!checkValid.length) {
//       user.compare.push(pokemonId);
//       user.save().then(data => res.status(200).json(data.compare));
//       // } else {
//       // return res.status(400).json("You alredy added this pokemon");
//       // }
//     });
//   }
// );

// router.delete(
//   "/compare/:id/:pokemonId",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { id, pokemonId } = req.params;
//     User.findById({ _id: id }).then(user => {
//       let checkValid = user.compare.filter(item => item === pokemonId);
//       let index = user.compare.indexOf(pokemonId);
//       if (checkValid.length) {
//         user.compare.splice(index, 1);
//         user.save().then(data => res.status(200).json(data.compare));
//       } else {
//         return res
//           .status(400)
//           .json(
//             "Sorry you don't have this pokemon in your compare and can't uncompare this"
//           );
//       }
//     });
//   }
// );

module.exports = router;

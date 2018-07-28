const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const keys = require("../../config/keys");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

// const Mailjet = require("node-mailjet").connect(
//   "758c820bde38079f64604245e658c816",
//   "a5a8935eba36be9750c0cd0c2c2e5774"
// );

const msg = function(email, html) {
  return {
    to: email,
    from: "admin@hobopokedex.herokuapp.com",
    subject: "Activate HoboPokedex Account",
    text: "Activate HoboPokedex account",
    html: html
  };
};

const email = require("../../email/email");
const validateRegisterInput = require("../../validation/register");
const validateUpdateUserInput = require("../../validation/updateUser");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

const mailjet = require("node-mailjet").connect(
  "758c820bde38079f64604245e658c816",
  "a5a8935eba36be9750c0cd0c2c2e5774",
  {
    url: "api.mailjet.com", // default is the API url
    version: "v3.1", // default is '/v3'
    perform_api_call: true // used for tests. default is true
  }
);

// .then(res => console.log(res))
// .catch(err => console.log(err));

router.get("/test", (req, res) => {
  // res.json({ msg: "Users Works" })
  res.redirect("/login");
});

router.get("/verify/:activeToken", (req, res) => {
  User.findOne({ activeToken: req.params.activeToken })
    .then(user => {
      user.active = true;
      user.activeToken = "";
      user
        .save()
        .then(verifaydUser => res.status(200).json("/login"))

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
            res.status(201).json(user.email);
            let html = `
                <h1>Hello and welcome to Hobo Pokedex</h1>
                <h5>Thank your for register, one more step and you can go to shop somthing, you need a verifay you<h5/>
                <h6>For verfay pleas click this link</h6>
                <a href="https://hobopokedex.herokuapp.com/activeemail/${
                  user.activeToken
                }">Verify accaount</a>
              `;
            sgMail.send(msg(user.email, html));
          });
        });
      });
    }
  });
});

router.post("/resendemailactive", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    let html = `
                <h1>Hello and welcome to Hobo Pokedex</h1>
                <h5>Thank your for register, one more step and you can go to shop somthing, you need a verifay you<h5/>
                <h6>For verfay pleas click this link</h6>
                <a href="https://hobopokedex.herokuapp.com/activeemail/${
                  user.activeToken
                }">Verify accaount</a>
              `;
    sgMail.send(msg(user.email, html));
  });
});

router.post(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        newName = req.body.name;
        newPassowrd = req.body.password ? req.body.password : "";
        if (newPassowrd) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassowrd, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.name = newName;
              user.save().then(user => {
                const payload = {
                  id: user.id,
                  name: user.name
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
              });
            });
          });
        } else {
          user.name = newName;
          user.save().then(user => {
            const payload = {
              id: user.id,
              name: user.name
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
          });
        }
      }
    });
  }
);

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
          name: user.name
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

module.exports = router;

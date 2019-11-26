const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  //guardando user y pass desde el form
  const username = req.body.username;
  const password = req.body.password;
  const refugio = req.body.refugio;
  const localizacion = req.body.localizacion;

  //comprueba que los campos tengan texto
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }


  User.findOne({ username }, "username", (err, user) => {
    
    //Comprueba que el usuario sea nuevo
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    //encriptacion password
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    //plantilla nuevo usuario
    const newUser = new User({
      username,
      password: hashPass,
      refugio,
      localizacion
    });

    //salva el nuevo usuario
    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

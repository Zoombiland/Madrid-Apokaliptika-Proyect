const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const axios = require('axios');

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
  const localizacion = req.body.address;
  


  //llamada axios a la api de google
    
    console.log('---------------------->estamos aqui-------------------->')
      
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${localizacion}&key=AIzaSyBrPNbJOlFtyYOkm722n_jbRGtSxOsE_q8`)
      .then (responseFromAPI => {
        let coordinates = responseFromAPI.data.results[0].geometry.location
        console.log(coordinates)
        //comprueba que los campos tengan texto
        
        if (username === "" || password === "") {
          // res.render("auth/signup", { message: "Indicate username and password" });
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
            localizacion,
            coordinates
            
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
      })
      .catch (error => console.log(error))       
    });
    
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

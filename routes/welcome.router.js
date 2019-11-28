const express = require('express');
const router = express.Router();
const APIHandler = require('../services/APIHandler')
const weatherApi = new APIHandler("https://www.metaweather.com/api/location/766273/")
const Places = require("../models/Places")
const axios = require('axios');
const User = require('../models/User')


router.get('/', (req, res) => {
  User.find()
    .then(allTheUsers => res.render({
      user: allTheUsers
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
})
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(theUser => res.render( {
      book: theUser
    }))
    .catch(err => console.log("Error consultando la BBDD: ", err))
});









router.get('/', (req, res, next) => {
  weatherApi.getFullList()
    .then(redata => {

      let data = [...redata.data.consolidated_weather]

      data.forEach(element => {
        if (element.min_temp) {
          let min_tempRounded = Math.round(element.min_temp)
          element.min_temp = min_tempRounded
        }
        if (element.max_temp) {
          let max_tempRounded = Math.round(element.max_temp)
          element.max_temp = max_tempRounded
        }
        if (element.the_temp) {
          let the_tempRounded = Math.round(element.the_temp)
          element.the_temp = the_tempRounded
        }
      });

      res.render('welcome', {
        alldata: redata.data.consolidated_weather

      })
    })
    .catch(error => {
      console.log('Error  ', error);
    })
})



router.get('/map', (req, res, next) => {
  res.render('map');
});

router.get('/places', (req, res, next) => {
  res.render('place')
});

router.post('/places', (req, res, next) => {
  console.log("Aqui estoy")
  const {
    nombre,
    direccion,
    categoria,
    activo,
    descripcion
  } = req.body




  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=AIzaSyBrPNbJOlFtyYOkm722n_jbRGtSxOsE_q8`)
    .then(responseFromAPI => {
      let coordinates = responseFromAPI.data.results[0].geometry.location
      console.log(coordinates)

      Places.findOne({
        nombre
      }, "nombre", (err, places) => {


        const newPlace = {
          nombre,
          direccion,
          categoria,
          activo,
          descripcion,
          coordinates
        };


        Places.create(newPlace)
          .then(resCreate => {
            res.redirect("/welcome");
          })
          .catch(err => {
            console.log("error creando place", err)
            res.render("place", {
              message: "Something went wrong"
            });
          })
      });
    })



})

router.get('/map/places', (req, res) => {
  Places.find()
    .then(thePlace => res.json({
      map: thePlace
    }))
    .catch(err => console.log("Error  esto se  a la mierda ", err))
})

module.exports = router;
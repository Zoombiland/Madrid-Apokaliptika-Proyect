const express = require('express');
const router = express.Router();
const APIHandler = require('../services/APIHandler')
const weatherApi = new APIHandler("https://www.metaweather.com/api/location/766273/")
const Places = require("../models/Places")
/* GET home page */

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
console.log("------->Empezamos aqui")
router.post('/places', (req, res, next) => {
  console.log("Aqui estoy")
  const {
    nombre,
    localizacion,
    categoria,
    activo,
    descripcion
  } = req.body
  // activo == "operativo" ? activo = true : activo = false
  console.log(
    nombre,
    localizacion,
    categoria,
    activo,
    descripcion
  )
  Places.create({
      nombre,
      localizacion,
      categoria,
      activo,
      descripcion
    })
    .then(x => res.redirect('/welcome'))
    .catch(err => console.log('error!!', err))
})

// router.get('/map/:id', (req, res) => {
//   const placeId = req.params.id
//   Place.findById(placeId)
//     .then(thePlace => res.render('map', {
//       map: thePlace
//     }))
//     .catch(err => console.log("Error consultando la BBDD: ", err))
// })

router.get('/map/places', (req, res) => {
  Places.find()
    .then(thePlace => res.json({map: thePlace
    }))
    .catch(err => console.log("Error  esto se  a la mierda ", err))
})

module.exports = router;
// console.log("--->", data, "despues de la modificacion")
// let min = Math.floor(data.min_temp,1)
// let max = Math.floor(data.max_temp,1)
// console.log(min)
// alldataMin: min, alldataMax: max
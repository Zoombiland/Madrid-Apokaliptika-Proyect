const express = require('express');
const router = express.Router();
const APIHandler = require('../services/APIHandler')
const weatherApi = new APIHandler("https://www.metaweather.com/api/location/766273/")
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
  
  module.exports = router;
  // console.log("--->", data, "despues de la modificacion")
  // let min = Math.floor(data.min_temp,1)
  // let max = Math.floor(data.max_temp,1)
  // console.log(min)
  // alldataMin: min, alldataMax: max
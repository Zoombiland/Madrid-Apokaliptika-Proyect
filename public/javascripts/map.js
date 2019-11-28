 var map;
 console.log("<--------reDATOS----------->")

 function initMap() {


   map = new google.maps.Map(document.getElementById('map'), {
     center: {
       lat: 40.414298,
       lng: -3.705811
     },
     zoom: 14,
     styles: [{
         elementType: 'geometry',
         stylers: [{
           color: '#242f3e'
         }]
       },
       {
         elementType: 'labels.text.stroke',
         stylers: [{
           color: '#242f3e'
         }]
       },
       {
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#746855'
         }]
       },
       {
         featureType: 'administrative.locality',
         elementType: 'labels.text',
         stylers: [{
           color: '#d59563'
         }, ]
       },
       {
         featureType: 'poi',
         elementType: 'labels.text',
         stylers: [{
           visibility: 'off'
         }]
       },
       {
         featureType: 'poi.park',
         elementType: 'geometry',
         stylers: [{
           color: '#263c3f'
         }]
       },
       {
         featureType: 'poi.park',
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#6b9a76'
         }, {
           visibility: 'on'
         }]
       },
       {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [{
           color: '#38414e'
         }]
       },
       {
         featureType: 'road',
         elementType: 'geometry.stroke',
         stylers: [{
           color: '#212a37'
         }]
       },
       {
         featureType: 'road',
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#9ca5b3'
         }]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry',
         stylers: [{
           color: '#746855'
         }]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry.stroke',
         stylers: [{
           color: '#1f2835'
         }]
       },
       {
         featureType: 'road.highway',
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#f3d19c'
         }]
       },
       {
         featureType: 'transit',
         elementType: 'geometry',
         stylers: [{
           color: '#2f3948'
         }]
       },
       {
         featureType: 'transit.station',
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#d59563'
         }]
       },
       {
         featureType: 'water',
         elementType: 'geometry',
         stylers: [{
           color: '#17263c'
         }]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.fill',
         stylers: [{
           color: '#515c6d'
         }]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.stroke',
         stylers: [{
           color: '#17263c'
         }]
       }
     ]
   })


   axios.get('/welcome/map/places')
     .then(redata => {
       //  console.log(redata)
       let allPlaces = redata.data.map
       //  console.log(dates, "dates")


       let markersArr = []
       let infoWindowArr = []

       allPlaces.forEach(place => {

         let marker = new google.maps.Marker({
           position: place.coordinates,
           map: map,

         })
         markersArr.push(marker)


         let infowindow = new google.maps.InfoWindow({

           content: `<div><h3>${place.nombre}</h3><br><h4>${place.categoria}</h4><br><h5>${place.activo}</h5><br><p>${place.descripcion}</p><div>`,
           
          //  "HOLI", //[place.nombre , place.categoria, place.activo, place.descripcion],
           maxWidth: 200,

         })
         marker.addListener('click', function () {
           infowindow.open(map, marker);
         });
         infoWindowArr.push(infowindow)





         //  console.log(place.coordinates)
       })
     })
 }

 //  infowindow = new google.maps.InfoWindow({
 //    content: contentString,
 //    maxWidth: 200
 //  })

 //  console.log("---------hasta aqui si-----------")
 //  console.log(markersArr)
 //  contentString =

 //    '</div>' +
 //    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
 //    '<div id="bodyContent">' +
 //    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
 //    'sandstone rock formation in the southern part of the ' +
 //    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
 //    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
 //    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
 //    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
 //    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
 //    'Aboriginal people of the area. It has many springs, waterholes, ' +
 //    'rock caves and ancient paintings. Uluru is listed as a World ' +
 //    'Heritage Site.</p>' <
 //    '/div>' 
 //  '</div>';





 //Paso al siguiente then las coordenadas
 //  return array
 //  .then(coordinatesArray => {

 //En este then pinto los markers
 //  console.log(coordinatesArray)
 //  })
 //  .then(() => {
 //    //Y despues pinto los infowindows
 //  })
 //  .catch(error => console.log('Error', error))
 //  }



 //  infowindow = new google.maps.InfoWindow({
 //    content: contentString,
 //    maxWidth: 200
 //  });
 //  




 //  console.log(redata)

 //  let data = [...redata.data]

 // data.forEach(element => {
 //   if (element.)
 // })

 //Markers








 /*var marker = new google.maps.Marker({
        map: map,
        position: { lat: 30, lng: 20 }
      }) --}}
{{!-- place = { lat: 40.39, lng: -3.69 }
map = new google.maps.Map(document.getElementById('map'), {
center: place,
zoom: 14
});
contentString =

'</div>' +
'<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
'<div id="bodyContent">' +
  '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>'
  </div>' 
'</div>';
infowindow = new google.maps.InfoWindow({
content: contentString,
maxWidth: 200
});
marker = new google.maps.Marker({
position: place,
map: map,
title: 'ironhack'
});

marker.addListener('click', function () {
  infowindow.open(map, marker);
});

/*
llamar a la bd de users, traer array de users
para cada user convertir su localizacion en coordenadas
pintar marker con cada una de esas coordenadas
*/
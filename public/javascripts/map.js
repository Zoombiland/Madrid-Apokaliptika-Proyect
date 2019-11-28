 var map;
 

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

       let allPlaces = redata.data.map



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
           maxWidth: 200,

         })
         marker.addListener('click', function () {
           infowindow.open(map, marker);
         });
         infoWindowArr.push(infowindow)





        
       })
     })
 }

 
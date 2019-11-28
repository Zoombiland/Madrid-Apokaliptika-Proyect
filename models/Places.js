const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    nombre: String,
    localizacion: String,
    categoria:  {
        type:String,
        enum: ['Alimentación', 'Farmacia', 'Hospital', 'Comunicaciones', 'Punto de encuentro'],
        default: "Punto de encuentro"
    },
    activo: String,
    descripcion:String
     }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('Place', placesSchema);
module.exports = User;

// router.get('/map/:id', (req, res) => {
//     const placeId = req.params.id
//     Place.findById(placeId)
//         .then(thePlace => res.render('map', {
//             map: thePlace
//         }))
//         .catch(err => console.log("Error consultando la BBDD: ", err))
// })
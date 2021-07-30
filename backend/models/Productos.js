const mongoose = require('mongoose');

const Productos = mongoose.Schema({
    nombreProducto : { type: String },
    idCategoria : { type: String },
    cantidadUnidades : { type: Number },
    costoUnitario : { type: Number }
});

module.exports = mongoose.model('Productos', Productos);
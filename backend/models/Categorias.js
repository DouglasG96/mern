const mongoose = require('mongoose');

const Categorias = mongoose.Schema({
    idCategoria : { type: Number },
    nombreCategoria : { type: String },
    colorAsociado : { type: Number }
});

module.exports = mongoose.model('Categorias', Categorias);
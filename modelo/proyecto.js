'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	codigo: Number,
	tipo: String,
	talla: String,
	color: String,
	cantidad: Number,
	precio: Number,
	imagen: String
});

module.exports = mongoose.model('camisetas',ProjectSchema);
//camisetas ----> guarda los documentos en la coleccion de labase de datos
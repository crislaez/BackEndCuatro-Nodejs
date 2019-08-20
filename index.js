'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tienda', { userNewUrlParser: true })
	.then(() => {
		console.log('Se a conectado a la base de datos');

		app.listen(port, () => {
			console.log(`Servidor corriendo en el puerto ${port}`)
		});
	})
	.catch(err => console.log(err));
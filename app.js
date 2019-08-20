'use strict'

var express = require('express');
var app = express();

//cargar archivos de rutas
var project_routes = require('./rutas/proyecto');

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    // res.render('../../backend.html');
    next();
});

//rutas
app.use('/api',project_routes); //ahora las rutas seran localhost:3700/api/home o localhost:3700/api/test    pero siempre delante api porque lo hemos puesto



//exportar
module.exports = app;
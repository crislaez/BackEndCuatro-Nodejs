'use strict'

var express = require('express');
var ProjectController = require('../controlador/proyecto');
var router = express.Router();

//hacer un middleware para subir imagenes
var multipart = require('connect-multiparty');  //crear la carpeta upload en el projecto------
var multipartMiddleware = multipart({uploadDir: './img'});
//creamos las 2 variables de arriva para que suba las fotos tambien en nuetro projecto---------------

router.get('/home',ProjectController.home);//estos metodos 'home', estan creadas en la carpeta controller archivo 'project'
router.post('/guardarProjecto',ProjectController.saveProject);
router.get('/mostrarProjecto',ProjectController.getProjects);
router.get('/mostrarUnProjecto/:id?',ProjectController.getProject);
router.put('/modificarProjecto/:id',ProjectController.updateProject);
router.delete('/borrarProjecto/:id',ProjectController.deleteProject);
router.post('/subirImagen/:id',multipartMiddleware,ProjectController.uploadImage);

module.exports = router;
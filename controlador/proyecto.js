'use strict'

var Project = require('../modelo/proyecto');
var fs = require('fs');

var controlador = {

	//estos metodos se ponen en el archivo project de la carpeta rutes------
	home: function(req, res){
		return res.status(200).send({
			message : 'Hola'
		})
	},
	//crear projectos--------------------------------------------------
	saveProject: function(req, res){
		var camiseta = new Project();
		var params = req.body;

		camiseta.codigo = params.codigo;
		camiseta.tipo = params.tipo;
		camiseta.talla = params.talla;
		camiseta.color = params.color;
		camiseta.cantidad = params.cantidad;
		camiseta.precio = params.precio;
		camiseta.imagen = null;

		camiseta.save((err, projectStored) =>{
			if(err) return res.status(500).send({message: 'Error al guardar'});
			if(!projectStored) return res.staatus(404).send({message: 'No se a podido giuardar'});

			return res.status(200).send({camiseta: projectStored});
		})

	},
	//mostrar projectos--------------------------------------------------
	getProjects: function(req, res){
		Project.find({}).exec((err, projects) =>{
			if(err) return res.status(500).send({message: 'Error al devolver datos'});
			if(!projects) return res.status(404).send({message: 'No existen'});

			return res.status(200).send({projects});
		})
	},
	//mostrar un proyecto por id----------------------------
	getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null){
			return res.status(404).send({message: 'La camiseta no existe'});
		}
		Project.findById(projectId, (err, project) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos'});
			if(!project) return res.status(404).send({message: 'El proyecto no existe'});

			return res.status(200).send({
				project
			})
		});
	},
	//modificar un proyecto por id-----------------------------
	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdate) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});
			if(!projectUpdate) return res.status(404).send({message: 'No existe la camiseta'});

			return res.status(200).send({project: projectUpdate});
		});
	},
	//borrar projecto-----------------------------------
	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemove) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar'});
			if(!projectRemove) return res.status(404).send({message: 'No de puede eliminar'});

			return res.status(200).send({Project: projectRemove});
		})
	},
	//añadir una imagen---------------------------------
		uploadImage: function(req, res){
		var projecId = req.params.id;
		var fileName = 'Imagen no subida..';
		
		if(req.files){
			var filePath = req.files.foto.path;
 			var fileSplit = filePath.split('\\');
 			var fileName = fileSplit[1];
 			var exSplit = fileName.split('\.');
 			var fileExt = exSplit[1];
 			// var fileName = req.files.foto.originalFilename;
 			// var fileSplit = fileName.split('.');
 			// var fileExt = fileSplit[1];

 			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
 			Project.findByIdAndUpdate(projecId, {imagen: fileName}, {new: true}, (err, projectUpdate) => {
 				if(err) return res.status(500).send({message: 'La imagen no se a subido'});
 				if(!projectUpdate) return res.status(404).send({message: 'El portatil no existe'});

 				return res.status(200).send({project: projectUpdate});
 				// return res.status(200).send({project: projectUpdate, message: req.files});
 			});	

 			}
 			else{
 				fs.unlink(filePath, (err) => {
 					return res.status(200).send({message: 'la extension no es valida'});
 				})
 			}
		}
		else{
			return res.status(200).send({message: fileName});
		}
	}


};

module.exports = controlador;
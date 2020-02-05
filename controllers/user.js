'use strict'

var User = require('../models/user');
var bodyParser = require('body-parser');
const express = require('express');
var router = express.Router();
var fs = require('fs');


var controller = {

    home: function(req, res) {

        return res.status(200).send({
            message: "API REST NODE JS Home"
        })
    },

    test: function(req, res) {
        return res.status(200).send({
            message: "API REST NODE JS Test"
        })
    },

    saveUser: function(req, res) {

        var user = new User();

        var params = req.body;
        user.nombres = params.nombres;
        user.apellidos = params.apellidos;
        user.edad = params.edad;
        user.imagen = null

        user.save((err, userStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar...!!!'
            });

            if (!userStored) return res.status(404).send({
                message: 'No se pudo guardar la informacion...!!!'
            });

            return res.status(200).send({
                user: userStored
            });

        });


    },


    getUser: function(req, res) {
        var userId = req.params.id;

        if (userId == null) return res.status(404).send({
            message: 'El usuario no existe...!!!'
        });


        User.findById(userId, (err, user) => {

            if (err) return res.status(500).send({
                message: 'Error al Buscar datos...!!!'
            });

            if (!user) return res.status(404).send({
                message: 'El usuario no existe...!!!'
            });

            return res.status(200).send({
                user
            });

        });

    },
    userList: function(req, res) {

        User.find({}).exec((err, users) => {
            if (err) return res.status(500).send({
                message: 'Error al Buscar datos...!!!'
            });

            if (!users) return res.status(404).send({
                message: 'No hay proyectos...!!!'
            });
            return res.status(200).send({
                users
            });

        });

    },

    updateUser: function(req, res) {
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, {
            new: true
        }, (err, userUpdate) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar datos...!!!'
            });
            if (!userUpdate) return res.status(404).send({
                message: 'No existe el proyecto...!!!'
            });
            return res.status(200).send({
                user: userUpdate
            });

        });

    },

    deleteUser: function(req, res) {
        var userId = req.params.id;
        User.findByIdAndRemove(userId, (err, userDelete) => {
            if (err) return res.status(500).send({
                message: 'Error al borrar datos...!!!'
            });

            if (!userDelete) return res.status(404).send({
                message: 'No existe el proyecto...!!!'
            });
            return res.status(200).send({
                user: userDelete
            });

        });

    },

    uploadImage: function(req, res){
		var userId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('/.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				User.findByIdAndUpdate(userId, {imagen: fileName}, {new: true}, (err, userUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!userUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						user: userUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

    getImageFile: function(req, res){
		var file = req.params.imagen;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}

};


module.exports = controller;

'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/prueba')
    .then(() => {

        console.log('Conectado con exito....!!!');


        ///////////// Creacion de servicios  ////////////
        app.listen(port, () => {
            console.log("servidor corriendo........ en el puerto 3700");

        })




    })
    .catch(err => console.log(err));

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
nombres: String,
apellidos: String,
edad : Number,
imagen: String

});

module.exports = mongoose.model('User', UserSchema );

'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var signInSchema = mongoose.Schema({
	member: Schema.ObjectId,
	date: Date,
	timeIn: Date,
	timeOut: Date
});

var SignIn = mongoose.model('SignIn', signInSchema);

module.exports = SignIn;

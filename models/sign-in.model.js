'use strict';

var mongoose = require("mongoose");

var signInSchema = mongoose.Schema({
	member: Schema.ObjectId,
	date: Date,
	timeIn: Date,
	timeOut: Date
});

var SignIn = mongoose.model('SignIn', signInSchema);

module.exports = SignIn;

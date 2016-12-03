'use strict';
var mongoose = require("mongoose");

var currentDate = new Date();
var memberSchema = mongoose.Schema({
	name: String,
	grade: Number,
	MICDSEmail: String,
	'signed-in': {type: Boolean, default: false},
	totalTime: {type: Number, default: 0},
	twoWeekTime: {type: Number, default: 0},
	mostRecentSignInTime: {type: Date, default: currentDate},
	mostRecentSignOutTime: {type: Date, default: currentDate},
	admin: {type: Boolean, default: false}
});

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;

'use strict';
var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
	name: String,
	grade: Number,
	signed-in: Boolean,
	totalTime: {type: Number, value: 0}
	weekTime: {type: Number, value: 0}
	mostRecentSignInTime: Date,
	mostRecentSignOutTime: Date
});

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;

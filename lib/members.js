'use strict';
var Member = require('../models/members.model');
var config = require('./config');

var addMembers = function(newMembers, callback) {
	if (typeof newMembers !== 'Object') {
		callback('Something wrong with request params?');
		return;
	};
	var addMember = function(member) {
			var newMember = new Member({
				grade: member.grade,
				name: member.name,
				MICDSEmail: member.emailUsername + '@micds.org'
			});
			newMember.save(function(err) {
				if (err) {
					callback(err);
					return;
				};
				console.log('Member saved!');
				return;
			})
	}
	if (typeof newMembers === 'Array') {
		newMembers.foreach(function(member) { addMember(member) });
	}
	addMember(newMembers);
}

var makeAdmin = function(member, adminPass, callback) {
	if (typeof member !== 'Object' || typeof adminPass !== 'String') {
		callback('Something wrong with request params?');
		return;
	};
	if (config.adminPass !== adminPass) {
		callback('Wrong admin password!');
		return;
	};
	Member.findOneAndUpdate(member, { admin: true }, function(err) {
		if (err) {
			callback(err);
			return;
		}
		return;
	});
}

module.exports = {
	addMembers: addMembers,
	makeAdmin: makeAdmin
}

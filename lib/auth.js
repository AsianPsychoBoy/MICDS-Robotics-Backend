'use strict';
const https = require('https');
var jwt = require('jsonwebtoken');

// login function, callback with error string, user object and jwt
var login = function(username, password, callback) {
	if (typeof username !== 'string' || typeof password !== 'string') {
		callback('Username or password not a string');
		return;
	}

	var userData = JSON.stringify({
		user: username,
		password: password,
		remember: false
	});

	var options = {
		hostname: 'api.mymicds.net',
		path: '/auth/login',
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(userData)
	}
	};

	console.log("logging in...")
	var req = https.request(options, (res) => {
		console.log('Requested login at mymicds, statusCode:', res.statusCode);
		console.log('headers:', res.headers);
		res.on('data', (d) => {
			var userData = JSON.parse(d.toString())
			// create a jwt to replace jwt returned from mymicds
			callback(null, d, '');
			return;
		});
	})
	req.write(userData);
	req.end();

	req.on('error', (e) => {
		console.error(e);
		callback(e);
		return;
	});
}

module.exports.login = login;

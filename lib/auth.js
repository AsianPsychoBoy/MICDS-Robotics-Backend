'use strict';
var https = require('https');
var jwt = require('jsonwebtoken');
var config = require('./config');

// login function, callback with error string, user object and jwt
var login = function(username, password, callback) {
	var userData = {
		error: undefined,
	}
	if (typeof username !== 'string' || typeof password !== 'string') {
		userData.error = 'Username or password not a string'
		callback(userData);
		return;
	}

	var postUserData = JSON.stringify({
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
        'Content-Length': Buffer.byteLength(postUserData)
    }
	};

	console.log("logging in...")
	var req = https.request(options, (res) => {
		console.log('Requested login at mymicds, statusCode:', res.statusCode);
		console.log('headers:', res.headers);
		res.on('data', (d) => {
			userData = JSON.parse(d.toString())
			// create a jwt to replace jwt returned from mymicds
			var payload = {
				user: username,
			};
			var options = {
				expiresIn: "1d",
				audience: "https://www.micdsrobotics.com",
				issuer: "https://www.micdsrobotics.com",
				subject: "MICDS-Robotics API",
			}
			var token = jwt.sign(payload, config.jwtSecret, options, function(err, token) {
				if (err) {
					userData.jwt = null;
					userData.error = 'Error generating token: ' + err
					callback(userData);
				};
				userData.jwt = token;
				callback(userData);
			});
			return;
		});
	})
	req.write(postUserData);
	req.end();

	req.on('error', (e) => {
		console.error(e);
		userData.error = 'Error during mymicds request: ' + e
		callback(userData);
		return;
	})
}

module.exports.login = login;

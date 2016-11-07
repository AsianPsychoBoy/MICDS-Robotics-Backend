'use strict';
var express = require('express');
var router = express.Router();

var auth = require('../lib/auth');
// POST for log in, sends user object containing username, password and jwt
router.post('/login', function(req, res, next) {
	res.type('json');
	auth.login(req.body.username, req.body.password, function(err, user) {
		if (err) {
			user.error = err;
			res.send(user);
		}
		res.cookie('jwt', user.jwt, { secure: true });
		res.send(user);
	})
});

module.exports = router;

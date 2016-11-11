'use strict';
var express = require('express');
var router = express.Router();

var auth = require('../lib/auth');
// POST for log in, sends user object containing username, password and jwt
router.post('/login', function(req, res, next) {
	auth.login(req.body.username, req.body.password, function(user) {
		res.type('json');
		if (!user.err) {
			res.clearCookie('jwt');
			res.cookie('jwt', user.jwt, {
				domain: 'localhost',
				secure: true
			});
		};
		res.send(user);
	})
});

module.exports = router;

'use strict';
var express = require('express');
var router = express.Router();

var members = require('../lib/members');

// GET sign-in page
router.get('/', function(req, res, next) {
	res.render('sign-in', { title: 'MICDS Robotics - sign in', page: 'sign-in'});
});

/* POST admin login info. */
router.post('/admin-login', function(req, res, next) {
console.log(req.body);
});

// GET members listing
router.get('/users', function(req, res, next) {

});

// GET individual members
router.get('/user/:id', function(req, res, next) {

});

// POST for signing in a user from admin account
router.post('/sign-in/:id', function(req, res, next) {

});

router.post('/add', function(req, res, next) {
	if (!req.user.admin) {
		var errObj = new Error('You don\'t have admin permission.');
		errObj.status = 403;
		next(errObj);
	}
	if (!req.body.name || !req.body.grade || !req.body.MICDSEmail) {
		var errObj = new Error('One or more required fields are empty.');
		errObj.status = 400;
		next(errObj);
	}
	members.addMembers(req.body, function(err) {
		if (err) {
			var errObj = new Error(err);
			errObj.status = 500;
			next(errObj);
		}
		// render success page
		res.redirect('/');
	})
});
module.exports = router;

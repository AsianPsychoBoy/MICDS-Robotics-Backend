'use strict';
var express = require('express');
var router = express.Router();

// Redirect to home
router.get('/', function(req, res, next) {
	res.redirect('/home')
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'MICDS Robotics - home', page: 'home' });
});

// GET about page
router.get('/about', function(req, res, next) {
	res.render('about', { title: 'MICDS Robotics - ', page: 'about'})
});

module.exports = router;

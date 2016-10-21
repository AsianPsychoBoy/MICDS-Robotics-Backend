'use strict';
var express = require('express');
var router = express.Router();

// GET blog page
router.get('/', function(req, res, next) {
	res.render('blog', { title: 'MICDS Robotics - blog', page: 'blog'})
})

// GET blog technology page
router.get('/technology', function(req, res, next) {
	res.render('blog', { title: 'MICDS Robotics - blog', page: 'blog/technology'})
})

// GET blog community page
router.get('/community', function(req, res, next) {
	res.render('blog', { title: 'MICDS Robotics - blog', page: 'blog/technology'})
})

module.exports = router;
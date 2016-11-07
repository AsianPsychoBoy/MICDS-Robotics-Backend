'use strict';
var express = require('express');
var router = express.Router();

var Blog = require('../lib/blog');

// GET blog page
router.get('/', function(req, res, next) {
	res.render('blog/blog', { title: 'MICDS Robotics - blog', page: 'blog'})
});

// GET blog technology page
router.get('/technology', function(req, res, next) {
	res.render('blog/technology', { title: 'MICDS Robotics - blog', page: 'blog/technology'})
});

// GET blog community page
router.get('/community', function(req, res, next) {
	res.render('blog/community', { title: 'MICDS Robotics - blog', page: 'blog/community'})
});

// GET view of one blog
router.get('./:id', function(req, res, next) {

});

// GET blog create page
router.get('/create', function(req, res, next) {
	res.render('blog/blog-create', { title: 'MICDS Robotics - create blog' })
});

// POST new blog entries
router.post('/create', function(req, res, next) {
	Blog.create(req.body, function(err) {
		if (err) {
			console.log(err);
			res.redirect(500, '/blog');
		}
		res.redirect('/blog');
	})
});

module.exports = router;

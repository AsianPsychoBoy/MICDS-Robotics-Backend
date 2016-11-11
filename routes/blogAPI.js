'use strict';
var express = require('express');
var router = express.Router();

var Blog = require('../lib/blog');

// GET blog page
router.get('/', function(req, res, next) {
	
	res.render('blog/blog', { title: 'MICDS Robotics - blog', page: 'blog', blogs: blogs});
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
	if (!req.body.title || !req.body.content || !req.body.createdOn || !req.body.lastEdit) {
		var errObj = new Error('One or more required fields are empty.');
		errObj.status = 400;
		next(errObj);
	}
	Blog.create(req.body, function(err) {
		if (err) {
			var errObj = new Error(err);
			errObj.status = 500;
			next(errObj);
		};
		res.redirect('/blog');
	})
});

router.post('/delete', function(req, res, next) {
	if (!req.body.blogId) {
		var errObj = new Error('One or more required fields are empty.');
		errObj.status = 400;
		next(errObj);
	}
	Blog.deleteOne(req.body.blogId, function(err) {
		if (err) {
			var errObj = new Error(err);
			errObj.status = 500;
			next(errObj);
		};
		res.redirect('/blog');
	})
});

router.post('/update', function(req, res, next) {
	if ((!req.body.title && !req.body.content && !req.body.createdOn && !req.body.lastEdit) || (!req.body.blogId)) {
		var errObj = new Error('One or more required fields are empty.');
		errObj.status = 400;
		next(errObj);
	}
	Blog.updateOne(req.body, function(err) {
		if (err) {
			var errObj = new Error(err);
			errObj.status = 500;
			next(errObj);
		};
		res.redirect('/blog');
	})
})

module.exports = router;

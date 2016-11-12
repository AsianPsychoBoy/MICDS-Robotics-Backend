'use strict';
var Blog = require('../models/blogs.model');

var create = function(blog, callback) {
	var newBlog = new Blog({
		title: blog.title,
		content: blog.content,
		createdOn: blog.createdOn,
		lastEdit: blog.lastEdit
	});
	newBlog.save(function(err) {
		if (err) {
			callback(err);
			return;
		};
		console.log('Blog saved!');
		return;
	});
}

var deleteOne = function(blogId, callback) {
	Blog.findByIdAndRemove(blogId, function (err) {
		if (err) {
			callback(err);
			return;
		}
		return;
	});
}

var updateOne = function(blog, callback) {
	var newBlog = {
		title: blog.title,
		content: blog.content,
		createdOn: blog.createdOn,
		lastEdit: blog.lastEdit
	};
	Blog.findByIdAndUpdate(blog.blogId, newBlog, function(err) {
		if (err) {
			callback(err);
			return;
		}
		return;
	});
}

module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;

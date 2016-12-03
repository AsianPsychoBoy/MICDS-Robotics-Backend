'use strict';
var Blog = require('../models/blogs.model');

var create = function(blog, callback) {
	// var newBlog = new Blog({
	// 	title: blog.title,
	// 	content: blog.content,
	// 	createdOn: blog.createdOn,
	// 	lastEdit: blog.lastEdit
	// });
	Blog.create(blog, function(err, blogDoc) {
		if (err) {
			callback(err, null);
			return;
		};
		callback(null, blogDoc);
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

var findAll = function(callback) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			callback(err, null);
		}
		var blogsObj = {};
		blogs.sort(function(a, b) {
			aDate = new Date(a.createdOn);
			bDate = new Date(b.createdOn);
			if (aDate < bDate) {
				return -1;
			}
			if (aDate > bDate) {
				return 1;
			}
			return 0;
		})
		.forEach(function(blog) {
			var createdOn = blog.createdOn;
			blogsObj[createdOn] = blog;
		});
		callback(null, blogsObj);
	});
}

module.exports.create = create;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;
module.exports.findAll = findAll;

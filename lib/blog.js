'use strict';
var Blog = require('../models/blogs');

var create = function(blog, callback) {
	if (typeof blog !== Object) {
		callback('Something wrong with the blog object sent.');
		return;
	}
	// if success use empty callback
}

module.exports.create = create;

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mockEntries = require('../mock/mockBlogEntries');

var blogSchema = new Schema({
	title: String,
	content: String,
	createdOn: Date,
	lastEdit: Date
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

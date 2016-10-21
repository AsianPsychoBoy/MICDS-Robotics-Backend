var express = require('express');
var router = express.Router();

// GET sign-in page
router.get('/', function(req, res, next) {
	res.render('sign-in', { title: 'MICDS Robotics - sign in', page: 'sign-in'})
})

/* POST admin login info. */
router.post('/admin-login', function(req, res, next) {
  console.log(req.body);
});

// GET members listing
router.get('/users', function(req, res, next) {
  
})

// GET individual members
router.get('/user/:id', function(req, res, next) {

})

// POST for sign in a user from admin account
router.post('/admin/:id', function(req, res, next) {

})
module.exports = router;

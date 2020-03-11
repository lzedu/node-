var express = require('express');
var router = express.Router();

/* GET users listing. */
const {signup,hasUser,signin,signout,isSignin} = require('../controllers/users')
router.post('/signup',hasUser, signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.get('/isSignin',isSignin);

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const passport = require('passport');

// To check if the user is logged in
const checkAuth = (req, res, next) => {
    if(!req.user) {
        console.log('You are not logged in');
        res.redirect('/auth/profile');
    } else {
        next();
    }
}

router.get('/', checkAuth, (req, res) => {
    res.send('Hello ' + req.user);
});

module.exports = router;
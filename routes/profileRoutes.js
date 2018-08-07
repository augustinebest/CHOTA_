const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const passport = require('passport');
// const userProfile = require('./authRoutes');

// To check if the user is logged in
// const checkAuth = router.get('/:id', (req, res, next) => {
//     const id = {_id: req.params.id};
//     User.findOne(id)
//     .exec()
//     .then(userData => {
//         if(!userData) {
//             res.redirect('/login');
//             // console.log('Not allowed!');
//         } else {
//             next();
//             // console.log('You are allowed to see this page!');
//         }
//     })
// })

router.get('/:id', (req, res) => {
    const id = {_id: req.params.id};
    // console.log(id);
    User.findOne(id)
    .exec()
    .then(userData => {
        res.send('You are logged in as: ' + userData);
    })
    .catch(err => {
        console.log('There exists an error somewhere!');
    });
    // res.send(req.user);
});



module.exports = router;
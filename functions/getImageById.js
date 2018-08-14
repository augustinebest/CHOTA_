const mongoose = require('mongoose');
const Interest = require('../Models/interest');

const getImageById = (id, req, res) => {
    Interest.findById(id)
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({err: 'Unable to obtain the ID'});
    });
}

module.exports = getImageById;
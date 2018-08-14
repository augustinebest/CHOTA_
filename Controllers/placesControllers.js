const Place = require('../Models/Places');
// const multer = require('multer');
// const fs = require('fs');
// const deleteImage = require('../functions/delete');

exports.addPlaces = (req, res, next) => {
    const place = new Place({
        name: req.body.name,
        image: req.file.path,
        description: req.body.description,
        reviews: req.body.reviews,
        ratings: req.body.ratings
    });
    place.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });

};





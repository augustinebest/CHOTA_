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

exports.getAllPlaces = (req, res, next) => {
    Place.find({})
    .exec()
    .then(place => {
        res.status(200).json({
            message:'Check it out', place
        });
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}



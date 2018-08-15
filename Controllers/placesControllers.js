const Place = require('../Models/Places');
// const multer = require('multer');
// const fs = require('fs');
// const deleteImage = require('../functions/delete');

exports.addPlaces = (req, res, next) => {
    // const place = new Place({
    //     name: req.body.name,
    //     image: req.file.path,
    //     description: req.body.description,
    //     reviews: req.body.reviews,
    //     ratings: req.body.ratings
    // });
    // place.save()
    // .then(result => {
    //     res.send(result);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    console.log(req.files);

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

exports.getById = (req, res, next) => {
    const id = req.params.placeId;
    Place.findById({_id: id})
    // .populate('reviews')
    .exec()
    .then(place => {
       // console.log(place);
        res.status(200).json({
            message: 'order details',
            placeId: req.params.placeId
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'No place with specified ID found',
            error: err
        })
    })
    });
};

exports.patchPlaces = (req, res, next) => {
    const id = req.params.placeId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Place.update({_id: id}, {$set: updateOps})
    //use when updating all properties 
    // Product.update({_id: id}, {$set: {name: req.body.newName, image: req.body.newImage, 
    //description: newDescription, reviews: newReviews, ratings: newRatings}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'data updated sucessfully'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });
};

exports.searchPlaces = (req, res) => {
    const name =  req.params.name;
    Place.find({'name': {$regex: name, $options: 'i'}})
    .exec()
    .then(place => {
        res.status(200).json(place);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deletePlaces = (req, res, next) =>{
    const id = req.params.placeId;
    Place.remove({ _id: id})
    .exec()
    .then(place => {
        res.status(200).json({
            message: 'Yeap! Entry deleted successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            error: 'Can\'t delete the specified place', err
        });
    })
};

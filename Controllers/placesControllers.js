const Place = require('../Models/Places');
var Category = require('../Models/Categories');
const cloud = require('../functions/cloudinary');
const Reviews = require('../Models/Reviews');
const User = require('../Models/User');

exports.addPlaces = (req, res, next) => {
    const place = new Place({
        name: req.body.name,
        image: req.file.path,
        imageID: '',
        description: req.body.description,
        date: req.body.date,
        categoryId: req.body.categoryId,
        reviews: req.body.reviews,
        ratings: req.body.ratings
    });
    
    // req.files.forEach(element => {
    //     // console.log(element.path);
    //     cloud.upload(element.path, (error, result) => {
    //         console.log(result);
    //     })
    // })
    try {
        cloud.upload(place.image).then(result => {
            place.image = result.url;
            place.imageID = result.Id;
            Place.create(place, (err, result) => {
                if(err) res.status(209).json({message: 'Cannot add to the database!'});
                Category.findById(req.body.categoryId).exec()
                    .then(cat => {
                        cat.placeId.push(result._id);
                        cat.save();
                        res.status(200).json({result, message: 'This have been added to the database!'});
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
        });
    } catch(error) {
        res.status(405).json({error: error});
    }

};

exports.getPlaceByParams = (req, res, next) => {
    const place = {_id: req.params.placeId};
    Place.findOne(place).populate('reviews categoryId', 'commentBody categoryName').exec()
    .then(result => {
        result.view++;
        result.trendVol = result.view + result.reviews.length;
        res.json({message: `There are ${result.reviews.length} reviews in this place`, result: result});
        result.save();
    })
    .catch(err => {
        console.log('error occurred in finding this');
    });
}

exports.getAllPlaces = (req, res, next) => {
    Place.find({})
    .select('_id name image description date categoryId')
    .exec()
    .then(place => {
        res.status(200).json({place});
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

exports.getLatest = (req, res, next) => {
    const value = parseInt(req.params.value);
    Place.find({}).sort({'_id': -1}) /* -1 is descending order */
    .select('_id name image description date categoryId').limit(value)
    .exec()
    .then(place => {
        res.status(200).json({place});
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

exports.patchPlaces = (req, res, next) => {
    const id = req.params.placeId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Place.update({_id: id}, {$set: updateOps})
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
    .select('_id name image imageID description date categoryId reviews')
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

exports.deleteAllPlaces = (req, res, next) =>{
    const places = req.params.place;
    Place.remove({})
    .exec()
    .then(place => {
        res.status(200).json({
            message: 'Yeap! places deleted successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            error: 'Can\'t delete all places', err
        });
    })
};

exports.addReview = (req, res, next) => {
    const placeId = {_id: req.params.placeId};
    const review = new Reviews({
        commentBody: req.body.commentBody,
        date: req.body.date,
        user_id: req.body.user_id
    });
    review.save();
    try {
        Place.findOne(placeId).exec((err, place) => {
            if(err) {
                res.status(308).json({err: err});
            }
            if(!place) {
                res.status(306).json({message: 'This place does not exist!'});
            }
            User.findOne({_id: review.user_id}).select('username image').exec((err, user) => {
                if(err) res.json(err);
                var check = place.reviews.push(review._id);
                if(check) {
                    place.save();
                    res.status(200).json({message: 'This review have been added successfully!', review: review, user: user});
                } else {
                    res.status(206).json({message: 'cannot add!'});
                }
            })
            
        })
    } catch(error) {
        res.json({error: error});
    }
}

exports.getAllReviews = (req, res, next) => {
    console.log('Yay');
}
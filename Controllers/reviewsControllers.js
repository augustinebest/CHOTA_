const Reviews = require('../Models/Reviews');
const Place = require('../Models/Places');

// Adding of Reviews
exports.addReview = (req, res, next) => {
    const reviews = new Reviews({
        commentBody: req.body.commentBody,
        placeId: req.body.placeId
    })
    reviews.save()
    .then(review => {
        try {
            Place.findOne(review.placeId).exec((err, result) => {
                // res.json(result);
                    if(err) {
                       console.log('There is an error!');
                    } else {
                        var check = result.reviews.push(review._id);
                        if(check) {
                            result.save();
                            res.status(200).json({message: 'This review have been added successfully!'});
                        } else {
                            res.status(206).json({message: 'cannot add!'});
                        }
                        // result.save();
                        // res.status(200).json({message: 'This review have been added successfully!'});
                    }
            })
        } catch (error) {
            res.status(309).json({error: error});
        }
    })
    .catch(err => {
        res.status(404).json({message: 'Error occured while adding your review!'});
    });
}

exports.getAllReviewsOnAPlace = (req, res, next) => {
    Reviews.find({})
    .select('_id commentBody placeId')
    .exec()
    .then(reviews => {
        res.status(200).json({reviews});
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}
    //console.log('yay');
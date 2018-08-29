const Place = require('../Models/Places');
var Category = require('../Models/Categories');
const cloud = require('../functions/cloudinary');

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
            console.log(result);
        });
    } catch(error) {
        res.status(405).json({error: error});
    }
    
    // place.save()
    // .then(result => {
    //     Category.findById(req.body.categoryId).exec()
    //     .then(cat => {
    //         cat.placeId.push(result._id);
    //         cat.save();
    //         res.status(200).json({result, message: 'This have been added to the database!'});
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });

};

exports.getPlaceByParams = (req, res, next) => {
    const place = {_id: req.params.placeId};
    Place.findOne(place).populate('reviews categoryId', 'commentBody categoryName').exec()
    .then(result => {
        res.json(result);
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

exports.patchPlaces = (req, res, next) => {
    const id = req.params.placeId;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Place.update({_id: id}, {$set: updateOps})
    //use when updating all properties 
    // Place.update({_id: id}, {$set: {name: req.body.newName, description: req.body.newDescription}})
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

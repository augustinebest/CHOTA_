const Interest = require('../Models/interest');
const multer = require('multer');
const fs = require('fs');
const deleteImage = require('../functions/delete');
const cloud = require('../functions/cloudinary');


exports.addInterest = (req, res, next) => {
    const interest = {
        name: req.body.name,
        image: req.file.path,
        imageID: ''
    }
    cloud.upload(interest.image).then(result => {
        interest.image = result.url;
        interest.imageID = result.Id;
        Interest.create(interest, (err, inst) => {
            if(err) res.status(401).json({err: err, message: 'Unable to add this interest'});
            else {
                res.status(200).json({message: 'This interest have been added succesfully!'});
            }
        })
    })
}


exports.getAllInterest = (req, res, next) => {
    Interest.find()
    .select('name image _id imageID')
    .exec()
    .then(interest => {
        res.status(200).json({interest: interest});
    })
    .catch(err => {
        res.status(404).json(err);
    });
}

exports.editInterest = (req, res, next) => {
    const id = {_id: req.params.id};
    // console.log(req.file);
    const data = {
        name: req.body.name,
        image: req.file.path
    }
    Interest.findById(id)
    .select('name image _id')
    .exec()
    .then(result => {
        try{
            fs.unlink(result.image, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('This image have been deleted!');
                }
            })
            Interest.update(id, data)
            .exec()
            .then(output => {
                res.status(200).json({message: 'The interest have been updated!'});
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({err: 'Unable to update this file!'});
            });
        } catch(err) {
            console.log(err);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({err: 'Unable to obtain the ID'});
    });
}


exports.deleteInterest = (req, res, next) => {
    try {
        const id = req.params.id;
        Interest.findById(id)
        .exec()
        .then(interest => {
            const imageID = interest.imageID;
            cloud.delete(imageID);
            Interest.remove({_id: req.params.id}).exec()
            .then(result => {
                res.status(200).json({message: 'This interest have been deleted!'});
            })
            .catch(err => {
                res.status(405).json({err: err});
            });
        })
        .catch(err => {
            res.status(500).json({err: 'Cannot delete this interest'});
        });
    } catch(error) {
        res.status(408).json(error);
    }
}
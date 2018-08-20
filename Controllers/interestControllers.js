const Interest = require('../Models/interest');
const multer = require('multer');
const fs = require('fs');
const deleteImage = require('../functions/delete');

exports.addInterest = (req, res, next) => {
    // console.log(req.file);
    const interest = new Interest({
        name: req.body.name,
        image: req.file.path
    });
    return interest.save()
    .then(interest => {
        // console.log(interest);
        res.status(200).json({message: 'This interest have been added successfully!'});
    })
    .catch(err => {
        console.log('Unable to add this interest!');
        console.log(err);
    });
    
}


exports.getAllInterest = (req, res, next) => {
    Interest.find()
    .select('name image _id')
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
    const id = req.params.id;
    Interest.findById(id)
    .exec()
    .then(result => {
        const image_path = result.image;
        deleteImage(image_path);
        Interest.remove({_id: req.params.id})
        .exec()
        .then(output => {
            // console.log(output);
            res.status(200).json({message: 'This have been deleted succesfully!'})
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({err: 'Unable to delete this interest'});
        });
    })
    .catch(err => {
        res.status(500).json({err: 'Cannot delete this interest'});
    });
}
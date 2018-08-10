const Interest = require('../Models/interest');
const multer = require('multer');
const fs = require('fs');
const deleteImage = require('../functions/delete');
// const uploads = require('../uploads/')

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
    Interest.find({})
    .exec()
    .then(interest => {
        res.status(200).json(interest);
    })
    .catch(err => {
        res.status(404).json(err);
    });
}

// exports.editInterest = (req, res, next) => {
//     const id = req.params.id;
//     // const data = {
//     //     name: req.body.name,
//     //     image: req.file.path
//     // }
//     Interest.findById(id)
//     .exec()
//     .then(result => {
//         console.log(image);
//         const image_path = result.image;
//         const image_name = image_path.slice(8).toString();
//         // console.log(image_name);
//         // try {
//         //     fs.unlink(uploads+image_name, (err) => {
//         //         if(err) {
//         //         console.log('unable to delete the image from the folder');
//         //         } else {
//         //             console.log('This image have been deleted!');
//         //         }
//         //     })
//         // } catch (err) {
//         //     console.log(err);
//         // }
//         // Interest.update(id, data)
//         // .exec()
//         // .then()
//         // .catch();
//     })
//     .catch(err => {
//         res.send('Cannot find this interest');
//     });
// }

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
            console.log(output);
            res.status(200).json({message: 'This have been deleted succesfully!'})
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({err: 'Unable to delete this interest'});
        });
    })
    .catch(err => {
        res.status(500).json({err: 'Cannot delete this interes'});
    });
}
const Category = require('../Models/Categories');
const Place = require('../Models/Places');
const cloud = require('../functions/cloudinary');

exports.addCategory = function(req, res) {
    // const category = new Category({
        const category = {
            categoryName: req.body.categoryName,
            image: req.file.path,
            imageID: '',
            placeId: req.body.placeId
        }
        
    // });

    cloud.upload(category.image).then(result => {
        category.image = result.url;
        category.imageID = result.Id;
        Category.create(category, (err, inst) => {
            if(err) res.status(401).json({err: err, message: 'Cannot add category, try again', err});
            else {
                res.status(200).json({message: 'Category added succesfully!'});
            }
        })
    })
}

//     category
//     .save()
//     .then(result => {
//         // console.log(`This category have been added!`);
//         res.status(200).json({message: 'Successfully added!'});
//     })
//     .catch(err => {
//         // console.log(err);
//         res.status(500).json({
//             error: "Cannot add category, please try again", err
//         });
//     });
// }

exports.getAllCategories = (req, res, next) => {
    Category.find().select('_id categoryName image')
    .exec((err, categories) => {
        if(err) res.status(404).json({message: 'error occured somewhere'});
        else {
            try {
                res.status(200).json(categories);
            } catch(error) {
                res.status(206).json(error);
            }
        }
    })
}

exports.getACategory = (req, res, next) => {
    const category = req.params.category;
    Category.findOne({'categoryName': {$regex: category, $options: 'i'}})
    .populate('placeId')
    .exec()
    .then(result => {
        res.status(200).json({result: result});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteAllCategory = (req, res, next) =>{
    const cat = req.params.category;
    Category.remove({})
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
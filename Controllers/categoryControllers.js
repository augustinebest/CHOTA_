const Category = require('../Models/Categories');
const Place = require('../Models/Places');

exports.addCategory = function(req, res) {
    const category = new Category({
        categoryName: req.body.categoryName,
        placeId: req.body.placeId
    });
    category
    .save()
    .then(result => {
        // console.log(`This category have been added!`);
        res.status(200).json({message: 'Successfully added!'});
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            error: "Cannot add category, please try again", err
        });
    });
}

exports.getAllCategories = (req, res, next) => {
    Category.find({}).select('_id categoryName')
    .exec((err, categories) => {
        if(err) res.status(404).json({message: 'error occured somewhere'});
        else {
            try {
                res.status(200).json(categories);
            } catch(error) {
                res.status(200).json(error);
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
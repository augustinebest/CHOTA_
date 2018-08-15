const CategoryModel = require('../Models/Categories');
// const bodyparser = require('body-parser');

exports.addCategory = function(req, res) {
    const categoryModel = new CategoryModel({
        categoryName: req.body.categoryName
    });
    categoryModel
    .save()
    .then(result => {
        console.log(`This category have been added!`);
        res.status(200).json({message: 'Successfully added!'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err: err});
    });
}
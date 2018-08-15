const Category = require('../Models/Categories');
// const bodyparser = require('body-parser');

exports.addCategory = function(req, res) {
    const category = new Category({
        categoryName: req.body.categoryName
    });
    category
    .save()
    .then(result => {
        console.log(`This category have been added!`);
        res.status(200).json({message: 'Successfully added!'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "Cannot add category, please try again", err
        });
    });
}
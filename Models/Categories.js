const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName: {type: String, unique: true} 
});

module.exports = mongoose.model('Category', CategorySchema);
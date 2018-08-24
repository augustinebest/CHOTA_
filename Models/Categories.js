const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName: {type: String, unique: true},
    placeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('Category', CategorySchema);
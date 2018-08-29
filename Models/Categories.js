const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName: {type: String, unique: true},
    image: { type: String },
    imageID: { type: String },
    placeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('Category', CategorySchema);
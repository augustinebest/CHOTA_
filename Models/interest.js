const mongoose = require('mongoose');

const interestSchema = mongoose.Schema({
    name : { type: String, required: true},
    image : { type: String },
    imageID : { type: String }
});


module.exports = mongoose.model('Interest', interestSchema);
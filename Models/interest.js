const mongoose = require('mongoose');

const interestSchema = mongoose.Schema({
    name : { type: String, required: true},
    image : { type: String, required: true},
    imageID : { type: String, required: true}
});


module.exports = mongoose.model('Interest', interestSchema);
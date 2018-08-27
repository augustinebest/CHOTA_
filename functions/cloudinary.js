const cloudinary = require('cloudinary');
const keys = require('../config/keys')

cloudinary.config({
    cloud_name: keys.cloudinary.class_name, 
    api_key: keys.cloudinary.api_key,
    api_secret: keys.cloudinary.api_secret
  })

exports.upload = function(file){
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, function(result){
            resolve({url: result.url, Id: result.public_id});
        }, {resource_type: "auto"})
   })
}

exports.uploads = function(files){
    files.forEach(element => {
        var file = element;
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, function(result){
                resolve({url: result.url, Id: result.public_id});
                // console.log(result);
            }, {resource_type: "auto"})
       })
    });
}

exports.delete = function(publicId) {
    cloudinary.uploader.destroy(publicId, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('It have been deleted in cloudinary!');
        }
    })
}
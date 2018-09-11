// require('dotenv').config({path: '/config/secret'});
const cloudinary = require('cloudinary');
const keys = require('../config/keys');

// const key = process.env.cloud_name;
// const key1 = process.env.api_key;
// const key2 = process.env.api_secret;

cloudinary.config({
    // cloud_name = 'chota',
    // api_key = '454241471689352',
    // api_secret = 'pCWnCq-cSSiM4UEcBrnI2EGTguQ'
    cloud_name: keys.cloudinary.cloudName,
    api_key: keys.cloudinary.apiKey,
    api_secret: keys.cloudinary.apiSecret
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
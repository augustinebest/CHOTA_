const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'chotaapp',
    api_key: '662324536894151',
    api_secret: '-Ksmzou9SDOxTUBZxjqs5BeOw-k'
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
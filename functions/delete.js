const fs = require('fs');

const deleteImage = (image_path) => {
    try {
        fs.unlink(image_path, (err) => {
            if(err) {
            console.log('unable to delete the image from the folder');
            } else {
                console.log('This image have been deleted!');
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = deleteImage;
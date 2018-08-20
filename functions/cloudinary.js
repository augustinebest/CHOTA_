const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'chota',
    api_key: '454241471689352',
    api_secret: 'pCWnCq-cSSiM4UEcBrnI2EGTguQ'
  })

  cloudinary.v2.uploader.upload('1.jpg', (error, result) => {
    if(error) {
      console.log(error);
    } else {
      console.log(result);
    }
  })
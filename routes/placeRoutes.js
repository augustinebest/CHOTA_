const express = require('express');
const router = express.Router();
// const checkAuth = require('../checkAuth/checkAuth');
const placeController = require('../Controllers/placesControllers');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/places/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
} 

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 });
 
router.post('/', upload.single('image'), placeController.addPlaces);
router.get('/', placeController.getAllPlaces);
router.get('/:placeId', placeController.getById);


module.exports = router;
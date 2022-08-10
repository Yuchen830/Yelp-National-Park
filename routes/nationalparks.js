const express = require('express');
const { model } = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Nationalpark = require('../models/nationalpark');
const {isLoggedIn, validateNationalpark, verifyAuthor} = require('../middleware');
//const nationalpark = require('../models/nationalpark');
const nationalparks = require('../controllers/nationalparks')

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();

router.route('/')
    .get(catchAsync(nationalparks.index) ) // indxe page
    .post(isLoggedIn, upload.array('image'), validateNationalpark, catchAsync(nationalparks.createPark));
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req.body, req.files);
    //     res.send("worked");
    // })

    
router.get('/new', isLoggedIn, nationalparks.newForm); // add new park form page

router.route('/:id')
    .get(catchAsync(nationalparks.showPark))
    .put(isLoggedIn, verifyAuthor, upload.array('image'), validateNationalpark, catchAsync(nationalparks.updatePark))
    .delete(isLoggedIn, verifyAuthor, catchAsync(nationalparks.deletePark));

router.get('/:id/edit', isLoggedIn, verifyAuthor, catchAsync(nationalparks.newEditForm));

module.exports = router;
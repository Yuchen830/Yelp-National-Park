const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Nationalpark = require('../models/nationalpark');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, verifyReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')

const router = express.Router({ mergeParams: true });


// Review 
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.delete('/:reviewId', isLoggedIn, verifyReviewAuthor, catchAsync(reviews.deleteReview));

 module.exports = router;

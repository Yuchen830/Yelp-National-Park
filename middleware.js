const { nationalparkSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Nationalpark = require('./models/nationalpark');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to create a new park!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateNationalpark = (req, res, next) => {
    // using Joi to validate data
    const { error } = nationalparkSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
} 

module.exports.verifyAuthor = async (req, res, next) =>{
    const { id } = req.params;
    const nationalpark = await Nationalpark.findById(id);
    if (!nationalpark.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do this!');
        return res.redirect(`/nationalparks/${id}`);
    }
    next();
}



module.exports.validateReview = (req, res, next) => {
    // using Joi to validate review
    const { error } = reviewSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
} 

module.exports.verifyReviewAuthor = async (req, res, next) =>{
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do this!');
        return res.redirect(`/nationalparks/${id}`);
    }
    next();
}


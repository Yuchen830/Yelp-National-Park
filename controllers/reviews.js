const Nationalpark = require('../models/nationalpark');
const Review = require('../models/review');

// route to add a nre review 
module.exports.createReview = async (req, res) => {
    const nationalpark = await Nationalpark.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    nationalpark.reviews.push(review);
    await review.save();
    await nationalpark.save();
    req.flash('success', 'Successfully created a new review!');
    res.redirect(`/nationalparks/${nationalpark._id}`);
 }


 // routes to delete review
 module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Nationalpark.findByIdAndUpdate(id, { $pull: { reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/nationalparks/${id}`);
 }
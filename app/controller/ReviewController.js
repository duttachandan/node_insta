const ReviewSchema = require("../model/ReviewSchema");
const PostSchema = require("../model/PostSchema");
const ExpressError = require("../utils/ExpressError");
const ReviewValidation = require("../utils/ReviewValidation");
const mongoose = require("mongoose");

class ReviewController {
  // Review Creation
  async createReview(req, res) {
    console.log(req.body, req.params.postid);
    if (!mongoose.Types.ObjectId.isValid(req.params.postid))
      throw new ExpressError(404, "Post Id not Found");
    const dataOfThePost = await PostSchema.findById(req.params.postid);
    if (!dataOfThePost) throw new ExpressError(404, "no post found");
    const validateReview = ReviewValidation.validate(req.body);
    if (validateReview.error)
      throw new ExpressError(400, validateReview.error.message);
    const review = new ReviewSchema(req.body);
    const reviewSubmit = await review.save();
    dataOfThePost.reviews.push(reviewSubmit);
    const saveData = await dataOfThePost.save();
    res.status(200).json(saveData);
  }

  // delete Review
  async deleteReview(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ExpressError(404, "id is wrong");
    const ReviewDataDelete = await ReviewSchema.findByIdAndDelete(
      req.params.id,
    );
    res.json(ReviewDataDelete);
  }

  async updateReview(req, res) {
    // update Review
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ExpressError(404, "id not found");
    const validateReview = ReviewValidation.validate(req.body);
    if (validateReview.error)
      throw new ExpressError(400, validateReview.error.message);
    const updateReview = await ReviewSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updateReview) throw new ExpressError(404, "Issue in Review Update");
    res.json({
      successfull: true,
      title: "Post Successfully Updated",
      data: updateReview,
    });
  }
}

module.exports = new ReviewController();

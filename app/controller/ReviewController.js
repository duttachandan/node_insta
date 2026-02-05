const ReviewSchema = require("../model/ReviewSchema");
const PostSchema = require("../model/PostSchema");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");

class ReviewController {
  // Review Creation
  async createReview(req, res) {
    console.log(req.body, req.params.postid);
    if (!mongoose.Types.ObjectId.isValid(req.params.postid))
      throw new ExpressError(404, "Post Id not Found");
    const dataOfThePost = await PostSchema.findById(req.params.postid);
    if (!dataOfThePost) throw new ExpressError(404, "no post found");
    const review = new ReviewSchema(req.body);
    const reviewSubmit = await review.save();
    dataOfThePost.reviews.push(reviewSubmit);
    const saveData = await dataOfThePost.save();
    console.log(saveData);
    res.status(200).json(saveData);
  }
  async deleteReview(req, res) {
    // delete Review
    console.log(req.params.id);
    const ReviewDataDelete = await ReviewSchema.findByIdAndDelete(
      req.params.id,
    );
    console.log(ReviewDataDelete);
    res.json(ReviewDataDelete);
  }
  async updateReviewa(req, res) {
    // update Review
  }
}

module.exports = new ReviewController();

const express = require("express");
const Router = express.Router();

// Global Try Catch Error Handler
const WrapAsync = require("../utils/WrapAsync");

// Controller
const ReviewController = require("../controller/ReviewController");

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Create New Reviews
Router.post(
  "/getpostbyid/:postid",
  imageUploader.none(),
  WrapAsync(ReviewController.createReview),
);

// Delete Reviews
Router.get(
  "/getpostbyid/:postid/deletereview/:id",
  WrapAsync(ReviewController.deleteReview),
);

// Update Reviews
Router.post(
  "/getpostbyid/:postid/updatereview/:id",
  imageUploader.none(),
  WrapAsync(ReviewController.updateReview),
);

module.exports = Router;


const express = require("express");
const Router = express.Router();

// Global Try Catch Error Handler
const WrapAsync = require("../utils/WrapAsync");

// Controller
const ReviewController = require("../controller/ReviewController");

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

Router.post(
  "/getpostbyid/:postid",
  imageUploader.none(),
  WrapAsync(ReviewController.createReview),
);

Router.get("/getpostbyid/:postid/deletereview/:id", WrapAsync(ReviewController.deleteReview));

module.exports = Router;

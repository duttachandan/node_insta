const express = require("express");
const Router = express.Router();

// Global Try Catch Error Handler
const WrapAsync = require("../utils/WrapAsync");

// Controller
const CommentsController = require("../controller/CommentsController");

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Create New Comments
Router.post(
  "/getpostbyid/:postid",
  imageUploader.none(),
  WrapAsync(CommentsController.createComment),
);

// Delete Comments
Router.get(
  "/getpostbyid/:postid/deletecomment/:id",
  WrapAsync(CommentsController.deleteComment),
);

// Update Comments
Router.post(
  "/getpostbyid/:postid/updatecomments/:id",
  imageUploader.none(),
  WrapAsync(CommentsController.updateComment),
);

module.exports = Router;

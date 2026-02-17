const express = require("express");
const Router = express.Router();

// user validator
const refreshToken = require("../helper/refreshToken");

// Global Try Catch Error Handler
const WrapAsync = require("../utils/WrapAsync");

// Controller
const CommentsController = require("../controller/CommentsController");

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Create New Comments
Router.post(
  "/getpostbyid/:postid",
  refreshToken,
  imageUploader.none(),
  WrapAsync(CommentsController.createComment),
);

// Delete Comments
Router.get(
  "/getpostbyid/:postid/deletecomment/:id",
  refreshToken,
  WrapAsync(CommentsController.deleteComment),
);

// Update Comments
Router.post(
  "/getpostbyid/:postid/updatecomments/:id",
  refreshToken,
  imageUploader.none(),
  WrapAsync(CommentsController.updateComment),
);

module.exports = Router;

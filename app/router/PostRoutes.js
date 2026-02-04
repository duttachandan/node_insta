const express = require("express");
const Router = express.Router();

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Controller
const PostController = require("../controller/PostController");

// Global Try Catch Error handler
const wrapAsync = require("../utils/WrapAsync");

// Routes
Router.get("/getallpost", wrapAsync(PostController.getPost));
Router.post(
  "/createPost",
  imageUploader.single("image"),
  wrapAsync(PostController.createPost),
);
Router.get("/deletepost/:id", wrapAsync(PostController.deletePost));
Router.post(
  "/updatepost/:id",
  imageUploader.single("image"),
  wrapAsync(PostController.updatePost),
);
Router.get("/getpostbyid/:id", wrapAsync(PostController.showPostById));
Router.get("/deletepost", wrapAsync(PostController.deleteAll));

module.exports = Router;

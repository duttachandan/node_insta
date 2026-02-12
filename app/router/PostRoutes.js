const express = require("express");
const Router = express.Router();

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Controller
const PostController = require("../controller/PostController");

// Global Try Catch Error handler
const wrapAsync = require("../utils/WrapAsync");
const verifyToken = require("../helper/refreshToken");

// Routes
Router.get("/getallpost", wrapAsync(PostController.getPost));
Router.get("/getpostbyid/:id", wrapAsync(PostController.showPostById));

// Protected Routes
Router.post(
  "/createPost",
  verifyToken,
  imageUploader.single("image"),
  wrapAsync(PostController.createPost),
);
Router.get(
  "/deletepost/:id",
  verifyToken,
  wrapAsync(PostController.deletePost),
);
Router.post(
  "/updatepost/:id",
  verifyToken,
  imageUploader.single("image"),
  wrapAsync(PostController.updatePost),
);

Router.get("/deletepost", wrapAsync(PostController.deleteAll));

module.exports = Router;

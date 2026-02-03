const express = require("express");
const Router = express.Router();

// multer Image Uploader
const imageUploader = require("../helper/imageUploader");

// Controller
const PostController = require("../controller/PostController");
Router.get("/getallpost", PostController.getPost);
Router.post(
  "/createPost",
  imageUploader.single("image"),
  PostController.createPost,
);
Router.get("/deletepost/:id", PostController.deletePost);
Router.get("/updatepost/:id", PostController.updatePost);
Router.get("/getpostbyid/:id", PostController.showPostById);
// Router.get('/deletepost/:id', PostController.softDelete);

module.exports = Router;

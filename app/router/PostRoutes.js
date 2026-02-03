const express = require("express");
const Router = express.Router();

// Controller
const PostController = require("../controller/PostController");

Router.get("/getallpost", PostController.getPost);
Router.post("/createPost", PostController.createPost);
Router.get("/deletepost/:id", PostController.deletePost);
Router.get("/updatepost/:id", PostController.updatePost);
Router.get("/getpostbyid/:id", PostController.showPostById);
// Router.get('/deletepost/:id', PostController.softDelete);

module.exports = Router;

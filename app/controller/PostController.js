require("dotenv").config();
const PostSchema = require("../model/PostSchema");
const userSchema = require("../model/userSchema");
const PostValidation = require("../utils/PostValidation");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");
const logger = require("../utils/Logger");
const jsonwebtoken = require("jsonwebtoken");
const Post = require("../model/PostSchema");
const SECRET_KEY = process.env.SECRET_KEY;

class PostController {
  // Show All the Post
  async getPost(req, res) {
    const allPost = await PostSchema.find()
      .populate("Comments")
      .populate("user");
    // logger.info(allPost);
    res.status(200).json(allPost);
  }

  // Show Post
  async showPostById(req, res) {
    const PostId = req.params.id;
    if (PostId) {
      const PostDetails =
        await PostSchema.findById(PostId).populate("Comments");
      res.send(PostDetails);
    } else {
      throw new ExpressError(404, "Post Not Found");
    }
    // Show Post By ID
  }

  // Create New Posts
  async createPost(req, res) {
    const { email } = req.user;
    const userCredentials = await userSchema.findOne({ email });
    if (!userCredentials)
      throw new ExpressError(404, "user credentials not found");
    const PostData = {
      image: req.file?.path,
      postTitle: req.body.postTitle,
      postDescription: req.body.postDescription,
      user: userCredentials.toObject(),
    };
    const postDataValidation = PostValidation.validate(PostData);
    const { error } = postDataValidation;
    if (error) throw new ExpressError(404, error.message);
    const post = new PostSchema(PostData);
    const savePost = await post.save();
    res.status(200).json(savePost);
  }
  // DeletePost
  async deletePost(req, res) {
    const { email } = req.user;
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ExpressError(400, "Invalid Post ID format");
    }
    if (!postId) throw new ExpressError(404, "post id not found");
    const findUserOfThePost =
      await PostSchema.findById(postId).populate("user");
    if (findUserOfThePost.user.email.toString() != email)
      throw new ExpressError(401, "you are unothorized to delete this post");
    const Delete = await PostSchema.findByIdAndDelete(postId);
    if (!Delete) throw new ExpressError(404, "Post not found");
    res.status(200).json(Delete);
  }
  // UpdatePost
  async updatePost(req, res) {
    const { email } = req.user;
    const PostId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(PostId) || !PostId)
      throw new ExpressError(404, "Invalid Post Id");
    let updatedPost = {
      image: req.file?.path,
      postTitle: req.body?.postTitle,
      postDescription: req.body?.postDescription,
    };
    const validatePost = PostValidation.validate(updatedPost);
    const postCredentials = await PostSchema.findById(PostId).populate("user");
    console.log(postCredentials);
    console.log(email);
    if (postCredentials.user.email != email)
      throw new ExpressError(
        401,
        "you don't have the correct authorization to update this post",
      );
    if (validatePost) {
      const saveData = await PostSchema.findByIdAndUpdate(PostId, updatedPost, {
        new: true,
      });
      if (saveData) {
        res.status(200).send("Successfully Updated");
      } else {
        throw new ExpressError(400, saveData.message);
      }
    }
  }

  // Delete all Post
  async deleteAll(req, res) {
    const deleteData = await PostSchema.deleteMany({});
    if (deleteData) {
      res.send(deleteData);
    } else {
      res.send(deleteData.message);
    }
  }
}

module.exports = new PostController();

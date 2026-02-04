const PostSchema = require("../model/PostSchema");
const PostValidation = require("../helper/PostValidation");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");

class PostController {
  // Show All the Post
  async getPost(req, res) {
    const allPost = await PostSchema.find();
    res.status(200).json(allPost);
  }

  // Create New Posts
  async createPost(req, res) {
    const PostData = {
      image: req.file?.path,
      postTitle: req.body.postTitle,
      postDescription: req.body.postDescription,
    };
    const postDataValidation = PostValidation.validate(PostData);
    // console.log(postDataValidation);
    const { error } = postDataValidation;
    if (error) throw new ExpressError(404, error.message);
    const post = new PostSchema(PostData);
    const savePost = await post.save();
    console.log(savePost);
    res.status(200).json(savePost);
  }

  // DeletePost
  async deletePost(req, res) {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ExpressError(400, "Invalid Post ID format");
    }
    if (!postId) throw new ExpressError(404, "post id not found");
    const Delete = await PostSchema.findByIdAndDelete(postId);
    if (!Delete) throw new ExpressError(404, "Post not found");
    res.status(200).json(Delete);
  }

  // UpdatePost
  async updatePost(req, res) {
    const PostId = req.params.id;
    if (!PostId) throw new ExpressError(404, "Post Id is not valid");
    const updatedPost = {
      image: req.file.path,
      postTitle: req.body.postTitle,
      postDescription: req.body.postDescription,
    };
    console.log(updatedPost);
    const validatePost = PostValidation.validate(updatedPost);
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
  // Show Post
  async showPostById(req, res) {
    const PostId = req.params.id;
    if (PostId) {
      const PostDetails = await PostSchema.findById(PostId);
      res.send(PostDetails);
    } else {
      throw new ExpressError(404, "Post Not Found");
    }
    // Show Post By ID
  }
}

module.exports = new PostController();

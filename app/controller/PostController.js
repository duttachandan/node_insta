require("dotenv").config();
const PostSchema = require("../model/PostSchema");
const userSchema = require("../model/userSchema");
const commentSchema = require("../model/CommentSchema");
const PostValidation = require("../utils/PostValidation");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");

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
  }

  // Create New Posts
  async createPost(req, res) {
    const { email } = req.user;
    const user = await userSchema.findOne({ email });
    if (!user) throw new ExpressError(404, "user credentials not found");
    const PostData = {
      image: req.file?.path,
      postTitle: req.body.postTitle,
      postDescription: req.body.postDescription,
      user: user.toObject(),
    };
    const { error } = PostValidation.validate(PostData);
    if (error) throw new ExpressError(404, error.message);
    const post = new PostSchema(PostData);
    const savePost = await post.save();
    user.post.push(savePost);
    await user.save();
    res.status(200).json(savePost);
  }

  // DeletePost
  async deletePost(req, res) {
    const { email } = req.user;
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new ExpressError(400, "Invalid Post ID format");
    }
    const findUserOfThePost = await PostSchema.findById(postId);
    const user = await userSchema.findOne({ email });
    if (!user) throw new ExpressError(404, "User not found");
    console.log(user._id);
    if (findUserOfThePost.user._id.toString() != user._id.toString())
      throw new ExpressError(401, "you are unothorized to delete this post");

    // Post Deletion
    const Delete = await PostSchema.findByIdAndDelete(postId);
    if (!Delete) throw new ExpressError(404, "Post not found");

    // Find The Post Id and then delete from the comments
    const deleteUserComment = findUserOfThePost?.post.map((elm, id) => {
      if (elm == Delete._id) {
        return id;
      }
    });
    findUserOfThePost?.post.splice(deleteUserComment, 1);
    await findUserOfThePost.save();

    // delete from comments schema
    await commentSchema.deleteMany({ post: postId });
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

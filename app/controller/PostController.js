const PostSchema = require("../model/PostSchema");
const PostValidation = require("../helper/PostValidation");

class PostController {

  // Show All the Post
  async getPost(req, res) {
    const allPost = await PostSchema.find();
    console.log(allPost);
    res.status(200).json(allPost);
  }

  // Create New Posts
  async createPost(req, res) {
    const PostData = {
      image: req.file.path,
      postTitle: req.body.postTitle,
      postDescription: req.body.postDescription,
    };
    const postDataValidation = PostValidation.validate(PostData);
    if (postDataValidation) {
      const post = new PostSchema(PostData);
      const savePost = await post.save();
      console.log(savePost);
      res.status(200).json(savePost);
    }
  }

  async deletePost(req, res) {
    // Delete Post
  }
  async updatePost(req, res) {
    // UpdatePost
  }
  async softDelete(req, res) {
    // Soft Delete Post
  }
  async showPostById(req, res) {
    // Show Post By ID
  }
}

module.exports = new PostController();

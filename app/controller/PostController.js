class PostController {
  async createPost(req, res) {
    // Post Creation
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
  async getPost(req, res) {
    // Get All the Post
    res.send("Post route working");
  }
  async showPostById(req, res) {
    // Show Post By ID
  }
}

module.exports = new PostController();

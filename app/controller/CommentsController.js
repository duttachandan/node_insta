const CommentSchema = require("../model/CommentSchema");
const PostSchema = require("../model/PostSchema");
const ExpressError = require("../utils/ExpressError");
const CommentsValidation = require("../utils/CommentsValidation");
const mongoose = require("mongoose");

class CommentsController {
  // Comments Creation
  async createComment(req, res) {
    console.log(req.body, req.params.postid);
    if (!mongoose.Types.ObjectId.isValid(req.params.postid))
      throw new ExpressError(404, "Post Id not Found");
    const dataOfThePost = await PostSchema.findById(req.params.postid);
    if (!dataOfThePost) throw new ExpressError(404, "no post found");
    const validateComments = CommentsValidation.validate(req.body);
    if (validateComments.error)
      throw new ExpressError(400, validateComments.error.message);
    const Comment = new CommentSchema(req.body);
    const CommentSubmit = await Comment.save();
    dataOfThePost.Comments.push(CommentSubmit);
    const saveData = await dataOfThePost.save();
    res.status(200).json(saveData);
  }
  // delete comment
  async deleteComment(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ExpressError(404, "id is wrong");
    const commentDataDelete = await CommentSchema.findByIdAndDelete(
      req.params.id,
    );
    res.json(commentDataDelete);
  }
  async updateComment(req, res) {
    // update Comments
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ExpressError(404, "id not found");
    const validateComments = CommentsValidation.validate(req.body);
    if (validateComments.error)
      throw new ExpressError(400, validateComments.error.message);
    const updateComments = await CommentSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updateComments) throw new ExpressError(404, "Issue in comment update");
    res.json({
      successfull: true,
      title: "Post Successfully Updated",
      data: updateComments,
    });
  }
}

module.exports = new CommentsController();

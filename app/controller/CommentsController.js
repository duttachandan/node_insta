const CommentSchema = require("../model/CommentSchema");
const PostSchema = require("../model/PostSchema");
const ExpressError = require("../utils/ExpressError");
const CommentsValidation = require("../utils/CommentsValidation");
const mongoose = require("mongoose");
const userSchema = require("../model/userSchema");

class CommentsController {
  // comments create
  async createComment(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.postid))
      throw new ExpressError(404, "Post Id not Found");
    const dataOfThePost = await PostSchema.findById(req.params.postid);
    if (!dataOfThePost) throw new ExpressError(404, "no post found");
    if (!req.user)
      throw new ExpressError(401, "You are not authorized to comment here");
    const { email } = req.user;
    const findUser = await userSchema.findOne({ email });
    console.log(req.body.comment);
    const userData = {
      comment: req.body.comment,
      user: findUser.id,
    };
    const validateComments = CommentsValidation.validate(userData);
    if (validateComments.error)
      throw new ExpressError(400, validateComments.error.message);
    const Comment = new CommentSchema(userData);
    const CommentSubmit = await Comment.save();
    dataOfThePost.Comments.push(CommentSubmit);
    await dataOfThePost.save();
    findUser.comments.push(CommentSubmit);
    await findUser.save();
    res.status(200).json(dataOfThePost);
  }
  // delete comment
  async deleteComment(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new ExpressError(404, "id is wrong");
    if (!req.user)
      throw new ExpressError(401, "You are not authorized to comment here");
    const { email } = req.user;
    // const findUser = await userSchema.findOne({ email });
    const ownerOfComment = await CommentSchema.findById(req.params.id).populate(
      "user",
    );
    // console.log(ownerOfComment);
    if (email != ownerOfComment.user.email)
      throw new ExpressError(
        401,
        "You are not authorized to delete this comment",
      );
    const commentDataDelete = await CommentSchema.findByIdAndDelete(
      req.params.id,
    );

    res.json(commentDataDelete);
  }
  // update comment
  async updateComment(req, res) {
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

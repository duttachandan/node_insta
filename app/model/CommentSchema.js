const mongoose = require("mongoose");
const { Schema } = mongoose;
const CommentSchema = Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "alluser" },
  },
  {
    timestamps: true,
  },
);

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;

const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "Image is Required"],
      default:
        "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
    },
    postTitle: {
      type: String,
      required: [true, "Title is Required"],
    },
    postDescription: {
      type: String,
    },
    Comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    user: { type: Schema.Types.ObjectId, ref: "alluser", required: true },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

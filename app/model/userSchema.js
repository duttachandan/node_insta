const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const CreateUser = mongoose.model("alluser", userSchema);

module.exports = CreateUser;


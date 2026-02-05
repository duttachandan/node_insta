const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

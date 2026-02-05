const Joi = require("joi");

const ReviewValidation = Joi.object({
  review: Joi.string(),
  rating: Joi.number().min(1).max(5).required(),
});

module.exports = ReviewValidation;

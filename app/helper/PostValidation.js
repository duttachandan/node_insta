const Joi = require("joi");

const PostValidation = Joi.object({
  image: Joi.string().required(),
  postTitle: Joi.string().required(),
  postDescription: Joi.string(),
});

module.exports = PostValidation;

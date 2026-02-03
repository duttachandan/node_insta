const Joi = require("joi");

const PostValidation = Joi.object({
  Image: Joi.string().required(),
  postTitle: Joi.string().required(),
  postDescription: Joi.string,
});

module.exports = PostValidation;

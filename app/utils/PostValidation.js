const Joi = require("joi");

const PostValidation = Joi.object({
  image: Joi.string().required(),
  postTitle: Joi.string().required(),
  postDescription: Joi.string(),
  user: Joi.object({
    _id: Joi.any().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    post: Joi.array(),
    comments: Joi.array(),
    __v: Joi.number(),
  }).required(),
});

module.exports = PostValidation;

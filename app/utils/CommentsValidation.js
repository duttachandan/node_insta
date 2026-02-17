const Joi = require("joi");

const CommentsValidation = Joi.object({
  comment: Joi.string().required(),
  reply: Joi.array(),
  user: Joi.string().required(),
});

module.exports = CommentsValidation;
